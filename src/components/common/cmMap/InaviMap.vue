<script lang="ts" setup>
import { locationMapEnv } from '@/envs';
import olMap from 'ol/Map';
import olView from 'ol/View';
import olFeature from 'ol/Feature';
import olGeomPoint from 'ol/geom/Point';

import { Vector as olVectorLayer } from 'ol/layer';
import { Vector as olVectorSource, Cluster as olSourceCluster } from 'ol/source';
import {
  Style as olStyleStyle,
  Fill as olStyleFill,
  Icon as olStyleIcon,
  Text as olStyleText,
  Stroke as olStyleStroke,
  Circle as olStyleCircle,
} from 'ol/style';
import olOverlay from 'ol/Overlay';

import * as olProj from 'ol/proj';
import * as olInteraction from 'ol/interaction';

import type MapBrowserEvent from 'ol/MapBrowserEvent';
import type Feature from 'ol/Feature';

import { isEmpty } from '@/utils/comUtils';
import type { MapMode } from '@/types/common/type.map';
// 아이나비에서 typescript 지원하지 않으므로 글로벌 타입 지정
declare global {
  interface Window {
    inavi: any;
    selectDevInInfoWindowInavi?: (id: string) => void;
  }
}

type Props = {
  id?: string;
  center?: MapPosition;
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
  visibleType?: 'NORMAL' | 'SATELLITE';
  maxBounds?: MapBounds; // [south-west, north-east]
  selectedMarkerId?: string;
  mode: MapMode;
  useInfoWindow?: boolean;
};

type Ol = {
  map: any;
  view: any;
  cluster: any;
  infoWindow: any;
};

const CRS_WGS84 = 'EPSG:4326';
const CRS_MERCATOR = 'EPSG:3857';
const STATUS_BG = {
  NORMAL: import.meta.env.BASE_URL + '/images/map_pin--normal.svg',
  WEAK: import.meta.env.BASE_URL + '/images/map_pin--weak.svg',
  OFF: import.meta.env.BASE_URL + '/images/map_pin--off.svg',
};
const STATUS_CLUSTER_IMG = {
  NORMAL: import.meta.env.BASE_URL + '/images/map_cluster--normal.svg',
  WEAK: import.meta.env.BASE_URL + '/images/map_cluster--weak.svg',
  OFF: import.meta.env.BASE_URL + '/images/map_cluster--off.svg',
};

const props = withDefaults(defineProps<Props>(), {
  id: 'inavi-' + (Math.random() + 1).toString().substring(10),
  center: () => {
    return {
      lat: locationMapEnv.defaultCenter.lat,
      lng: locationMapEnv.defaultCenter.lng,
    };
  },
  zoom: locationMapEnv.defaultZoom,
  minZoom: locationMapEnv.minZoom,
  maxZoom: locationMapEnv.maxZoom,
  visibleType: 'NORMAL',
  mode: 'default',
  useInfoWindow: true,
});

const emits = defineEmits<{
  (e: 'load'): void;
  (e: 'change:center', center: MapPosition): void;
  (e: 'change:zoom', zoom: number): void;
  (e: 'click:marker', markerId: string): void;
  (e: 'select:dev', id: string): void;
  (e: 'search:address', position: MapPosition): void;
  (e: 'click:cluster', markers: MapMarker[]): void;
}>();

let inaviMap: any = undefined;

const ol: Ol = {
  map: undefined,
  view: undefined,
  cluster: undefined,
  infoWindow: undefined,
};

// 지도 초기화
async function initMap() {
  // 아이나비
  inaviMap = new window.inavi.maps.Map({
    container: props.id,
    zoom: props.zoom - 1,
    center: props.center,
    logoScaleControl: {
      position: 'bottom-right',
      disableScale: false,
    },
    disableDefaultUI: true,
  });

  // ol
  const olViewOption: Record<string, any> = getViewOptions();

  ol.view = new olView(olViewOption);
  ol.map = new olMap({
    target: document.getElementById(props.id + '-ol')!,
    layers: [],
    view: ol.view,
    interactions: olInteraction
      .defaults({ dragPan: false, mouseWheelZoom: false })
      .extend([
        new olInteraction.DragPan({}),
        new olInteraction.MouseWheelZoom({ duration: 0, constrainResolution: true }),
      ]),
  });

  syncActionOlInavi();

  ol.map.on('singleclick', handleClickMap);
  ol.map.on('pointermove', (event: MapBrowserEvent) => {
    const hit = ol.map.forEachFeatureAtPixel(event.pixel, () => true);
    if (hit) {
      ol.map.getTargetElement().style.cursor = 'pointer';
    } else {
      ol.map.getTargetElement().style.cursor = '';
    }
  });
}
// 뷰 옵션
function getViewOptions() {
  let olViewOption: Record<string, any> = {
    center: olProj.transform([props.center.lng, props.center.lat], CRS_WGS84, CRS_MERCATOR),
    maxZoom: props.maxZoom,
    minZoom: props.minZoom,
    zoom: props.zoom,
    enableRotation: false,
  };

  if (props.maxBounds && !isEmpty(props.maxBounds)) {
    const _maxBounds = props.maxBounds!;
    const minLng = Math.min(_maxBounds[0].lng, _maxBounds[1].lng);
    const minLat = Math.min(_maxBounds[0].lat, _maxBounds[1].lat);
    const maxLng = Math.max(_maxBounds[0].lng, _maxBounds[1].lng);
    const maxLat = Math.max(_maxBounds[0].lat, _maxBounds[1].lat);

    const maxBounds = olProj.transformExtent([minLng, minLat, maxLng, maxLat], CRS_WGS84, CRS_MERCATOR);

    olViewOption = { ...olViewOption, extent: maxBounds };
  }
  return olViewOption;
}

// ol / 아이나비 동기화
function syncActionOlInavi() {
  // ol 지도 이동 시 아이나비 동기화
  ol.map.getView().on('change:center', () => {
    const center = olProj.transform(ol.view.getCenter(), CRS_MERCATOR, CRS_WGS84);
    inaviMap.setCenter({
      lat: center[1],
      lng: center[0],
    });

    emits('change:center', { lat: center[1]!, lng: center[0]! });
  });

  // ol 지도 zoom 변경 시 아아나비 동기화
  ol.map.getView().on('change:resolution', () => {
    let zoom = ol.view.getZoom();
    if (zoom > props.maxZoom) {
      zoom = props.maxZoom;
    }
    if (zoom < props.minZoom) {
      zoom = props.minZoom;
    }

    inaviMap.setZoom(zoom - 1);
    emits('change:zoom', zoom);
  });
}

// 뷰 업데이트
function refreshView() {
  const olViewOption = getViewOptions();
  ol.view = new olView(olViewOption);
  ol.map.setView(ol.view);
  syncActionOlInavi();

  // 아이나비 중심 이동
  const center = olProj.transform(ol.view.getCenter(), CRS_MERCATOR, CRS_WGS84);
  inaviMap.setCenter({
    lat: center[1],
    lng: center[0],
  });

  emits('load');
}

// 지도 visible 타입 설정
function setVisibleType() {
  inaviMap.setType(props.visibleType);
}

// 지도 클릭 핸들러
function handleClickMap(event: MapBrowserEvent) {
  const feature = ol.map.forEachFeatureAtPixel(event.pixel, (f: Feature) => f);
  if (!feature) {
    const position = olProj.transform(event.coordinate, CRS_MERCATOR, CRS_WGS84);
    emits('search:address', { lat: position[1]!, lng: position[0]! });
    return;
  }

  const features = feature.get('features');
  if (features.length === 1) {
    // 마커 클릭
    emits('click:marker', features[0].get('data').id);
  } else {
    // 클러스터 클릭
    handleClusterClick(feature);
  }
  event.preventDefault();
  event.stopPropagation();
}

// 마커 클러스터 설정
function setMarkerCluster(markers: MapMarker[]) {
  if (ol.cluster) {
    ol.map.removeLayer(ol.cluster);
  }

  const markerFeatures: olFeature<olGeomPoint>[] = [];
  markers.forEach((_i) => {
    const feature = new olFeature({
      geometry: new olGeomPoint(olProj.transform([_i.position.lng, _i.position.lat], CRS_WGS84, CRS_MERCATOR)),
      id: _i.id,
      data: _i,
      title: _i.label,
    });

    markerFeatures.push(feature);
  });

  // ol 클러스터 생성
  ol.cluster = new olVectorLayer();

  const source = new olVectorSource({
    features: markerFeatures,
  });

  const sourceCluster = new olSourceCluster({
    distance: 60,
    source,
  });

  ol.cluster.setSource(sourceCluster);
  ol.cluster.setStyle(getClusterStyle());
  ol.cluster.setZIndex(1);
  ol.cluster.setVisible(true);
  ol.map.addLayer(ol.cluster);
}

// 모드별 클러스터 스타일 설정
function getClusterStyle() {
  if (props.mode === 'setting') {
    return olClusterLayerSettingStyle;
  } else if (props.mode === 'preview') {
    return olClusterLayerPreviewStyle;
  }
  return olClusterLayerStyle;
}

// 기본 클러스터 스타일 정의
function olClusterLayerStyle(feature: Feature) {
  const count = feature.get('features').length;
  let clusterStyle = undefined;
  if (count === 1) {
    // 마커
    const childFeature = feature.get('features')[0];

    const bgIcon = STATUS_BG[childFeature.get('data').status as DevStatus];

    if (props.selectedMarkerId === childFeature.get('data').id) {
      clusterStyle = [
        new olStyleStyle({
          text: new olStyleText({
            text: childFeature.get('data').label,
            textAlign: 'center',
            offsetY: 45,
            font: 'bold 16px Pretendard',
            fill: new olStyleFill({
              color: '#111111',
            }),
            stroke: new olStyleStroke({
              width: 1,
              color: 'white',
            }),
          }),
          image: new olStyleIcon({
            src: bgIcon,
            width: 64,
            height: 78,
          }),
        }),
        new olStyleStyle({
          image: new olStyleIcon({
            color: 'white',
            src: childFeature.get('data').icon,
            width: 28,
            height: 28,
            anchor: [0.5, 0.77],
          }),
        }),
      ];
    } else {
      clusterStyle = [
        new olStyleStyle({
          text: new olStyleText({
            text: childFeature.get('data').label,
            textAlign: 'center',
            offsetY: 35,
            font: 'bold 16px Pretendard',
            fill: new olStyleFill({
              color: '#111111',
            }),
            stroke: new olStyleStroke({
              width: 1,
              color: 'white',
            }),
          }),
          image: new olStyleIcon({
            src: bgIcon,
            width: 46,
            height: 55,
          }),
        }),
        new olStyleStyle({
          image: new olStyleIcon({
            color: 'white',
            src: childFeature.get('data').icon,
            width: 20,
            height: 20,
            anchor: [0.5, 0.77],
          }),
        }),
      ];
    }
  } else {
    // 마커 클러스터

    const childFeature = feature.get('features')[0];
    const clusterBgIcon = STATUS_CLUSTER_IMG[childFeature.get('data').status as DevStatus];

    clusterStyle = new olStyleStyle({
      text: new olStyleText({
        text: count > 999 ? '999+' : String(count),
        textAlign: 'center',
        offsetY: -5,
        font: '13px bold Pretendard',
        fill: new olStyleFill({
          color: 'white',
        }),
        stroke: new olStyleStroke({
          width: 1,
          color: 'white',
        }),
      }),
      image: new olStyleIcon({
        src: clusterBgIcon,
      }),
    });
  }

  return clusterStyle;
}

// 설정 클러스터 스타일 정의
function olClusterLayerSettingStyle(feature: Feature) {
  const clusterStyle = new olStyleStyle({
    image: new olStyleCircle({
      radius: 8,
      fill: new olStyleFill({
        color: '#FF2E98',
      }),
      stroke: new olStyleStroke({
        color: '#F1F1F5',
        width: 2,
      }),
    }),
  });

  return clusterStyle;
}

// 미리보기 클러스터 스타일 정의
function olClusterLayerPreviewStyle(feature: Feature) {
  const clusterStyle = new olStyleStyle({
    image: new olStyleCircle({
      radius: 15,
      fill: new olStyleFill({
        color: '#FF2E98',
      }),
      stroke: new olStyleStroke({
        color: '#F1F1F5',
        width: 1,
      }),
    }),
  });

  return clusterStyle;
}

// 마커 클러스터 클릭 핸들러
function handleClusterClick(feature: Feature) {
  // 최소 줌 설정
  if (ol.map.getView().getZoom() < 10) {
    ol.map.getView().setZoom(10);
  }

  // 중앙 이동
  ol.view.setCenter(feature.get('geometry').flatCoordinates);

  const features = feature.get('features');

  // 정보창 사용하지 않으면 이벤트 발생
  if (!props.useInfoWindow) {
    emits('click:cluster', features.map((_i: any) => _i.get('data')) as MapMarker[]);
    return;
  }

  const info = document.createElement('div');
  info.classList.add('inavi-map--info-window');

  const wrapper = document.createElement('div');
  wrapper.classList.add('inavi-map--info-window__wrapper');

  features.forEach((_i: Feature) => {
    const data = _i.get('data');
    const dev = document.createElement('div');
    dev.classList.add('inavi-map--info-window__dev');

    const imgWrapper = document.createElement('div');
    imgWrapper.classList.add('inavi-map--info-window__img-wrapper');
    imgWrapper.classList.add(data.status.toLowerCase());

    const img = document.createElement('img');
    img.src = data.icon;
    imgWrapper.appendChild(img);

    const label = document.createElement('span');
    label.innerText = data.label;

    dev.appendChild(imgWrapper);
    dev.appendChild(label);
    dev.setAttribute('onclick', `selectDevInInfoWindowInavi('${data.id}')`);

    wrapper.appendChild(dev);
  });

  info.appendChild(wrapper);

  ol.infoWindow = new olOverlay({
    element: info,
    positioning: 'bottom-center',
    stopEvent: true,
    offset: [0, -30],
  });

  ol.map.addOverlay(ol.infoWindow);
  ol.infoWindow.setPosition((feature.getGeometry()! as any).getCoordinates());
}

// 정보창에서 장비 선택
function selectDevInInfoWindowInavi(_id: string) {
  if (ol.infoWindow) {
    closeInfoWindow();
  }

  setZoom(14);
  emits('select:dev', _id);
}

// 줌 설정
function setZoom(_zoom: number) {
  ol.map.getView().setZoom(_zoom);
}

// 지도 중앙 설정
function setCenter(_position: MapPosition) {
  const center = olProj.transform([_position.lng, _position.lat], CRS_WGS84, CRS_MERCATOR);
  ol.view.setCenter(center);
}

// 마커 설정
function setMarkers(markers: MapMarker[]) {
  setMarkerCluster(markers);
}

// 마커 초기화
function clearMarkers() {
  ol.map.removeLayer(ol.cluster);
  ol.cluster = undefined;
}

// 정보창 열기
function addInfoWindow(element: HTMLElement) {
  ol.infoWindow = new olOverlay({
    element: element,
    positioning: 'bottom-center',
    stopEvent: true,
    offset: [0, -30],
  });
  ol.map.addOverlay(ol.infoWindow);
  ol.infoWindow.setPosition(ol.view.getCenter());
}

// 정보창 닫기
function closeInfoWindow() {
  if (!ol.infoWindow) {
    return;
  }

  ol.map.removeOverlay(ol.infoWindow);
  ol.infoWindow = undefined;
}

watch(
  () => props.visibleType,
  () => {
    setVisibleType();
  },
);

watch(
  () => props.zoom,
  () => {
    setZoom(props.zoom);
  },
);

watch(
  () => props.selectedMarkerId,
  () => {
    ol.cluster?.changed();
  },
);

onMounted(() => {
  initMap();

  nextTick(() => {
    emits('load');
    window.selectDevInInfoWindowInavi = selectDevInInfoWindowInavi;
  });
});

onBeforeUnmount(() => {
  window.selectDevInInfoWindowInavi = undefined;
});

defineExpose({
  setZoom,
  setCenter,
  setMarkers,
  clearMarkers,
  addInfoWindow,
  closeInfoWindow,
  refreshView,
});
</script>

<template>
  <div class="cm-map-inavi cm-map__wrapper">
    <div class="cm-map-inavi__wrapper">
      <!-- 아이나비 -->
      <div :id="`${props.id}`" class="cm-map-inavi__map"></div>
      <!-- ol (아이나비 마커 클러스터 기능 보완) -->
      <div :id="`${props.id}-ol`" class="cm-map-inavi__ol"></div>
    </div>
  </div>
</template>

<style lang="scss">
// FIXME: 임시로 윈도우 스타일 작성, 퍼블리싱 수정 필요합니다. - 3/24, devsun

.inavi-map--info-window {
  position: relative;
  padding: 8px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: var(--popup-box-shadow);

  &__wrapper {
    max-width: 170px;
    max-height: 280px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 4px;
    scrollbar-color: rgba(155, 155, 155, 0.5) #f1f1f1;
    user-select: none;
  }

  &__dev {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-height: 56px;
    min-width: 170px;
    padding: 0 8px;
    border-radius: 6px;

    cursor: pointer;
    img {
      width: 20px;
      height: 20px;
    }
    span {
      font-size: 15px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    &:hover {
      background-color: #f7f7fb;
    }
  }

  &__img-wrapper {
    width: 32px;
    height: 32px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &.normal {
      background: #00bf40;
    }
    &.weak {
      background: #ff9200;
    }
    &.off {
      background: #999999;
    }
  }
}

// 스타일 오류 수정
canvas {
  display: unset !important;
  max-width: unset !important;
  height: unset !important;
}
</style>
