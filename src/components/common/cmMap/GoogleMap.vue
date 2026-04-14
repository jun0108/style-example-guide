<script lang="ts" setup>
// setting reference: https://github.com/google.maps/js-api-loader
// documents: https://google.maps.github.io/js-markerclusterer/index.html

import { googleMapEnv, locationMapEnv } from '@/envs';
import type { MapMarker, MapMode } from '@/types/common/type.map';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
import { Cluster, MarkerClusterer, type SuperClusterOptions } from '@googlemaps/markerclusterer';
import togeojson from '@mapbox/togeojson';

declare global {
  interface Window {
    selectDevInInfoWindow?: (id: string) => void;
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

const props = withDefaults(defineProps<Props>(), {
  id: 'googlemap' + (Math.random() + 1).toString().substring(10),
  center: () => {
    return { lat: locationMapEnv.defaultCenter.lat, lng: locationMapEnv.defaultCenter.lng };
  },
  zoom: locationMapEnv.defaultZoom,
  minZoom: locationMapEnv.minZoom,
  maxZoom: locationMapEnv.maxZoom,
  visibleType: 'NORMAL',
  useInfoWindow: true,
});

const emits = defineEmits<{
  (e: 'load'): void;
  (e: 'change:center', center: MapPosition): void;
  (e: 'change:zoom', zoom: number): void;
  (e: 'click:marker', markerId: string): void;
  (e: 'select:dev', id: string): void;
  (e: 'click:cluster', markers: MapMarker[]): void;
}>();

let map: any = undefined;
let markerClusterer: any = undefined;
let infoWindow: google.maps.InfoWindow | undefined = undefined;
let kmlFeatures: any = undefined;

// 지도 로드
async function loadMap() {
  setOptions({ key: atob(googleMapEnv.apiKey), libraries: ['marker'] });
  await importLibrary('maps');
  await importLibrary('marker');

  return Promise.resolve();
}

// 지도 초기화
async function initMap() {
  if (!google.maps) {
    return;
  }

  // 지도 생성
  const mapEl = document.getElementById(props.id);
  if (!mapEl) {
    return;
  }
  map = new google.maps.Map(mapEl, {
    center: props.center,
    zoom: props.zoom,
    minZoom: props.minZoom,
    maxZoom: props.maxZoom,
    disableDefaultUI: true,
    gestureHandling: 'greedy',
    scaleControl: true,
    mapId: googleMapEnv.mapId,
  });

  map.addListener('dragend', () => {
    const center = map.getCenter().toJSON();
    emits('change:center', center);
  });

  map.addListener('zoom_changed', () => {
    const zoom = map.getZoom();
    emits('change:zoom', zoom);
  });

  setVisibleType();
  setMaxBounds();
  await setMarkerClusterer();
  return Promise.resolve();
}

// 지도 visible 타입 설정
function setVisibleType() {
  if (!map) {
    return;
  }
  map.setMapTypeId(props.visibleType === 'NORMAL' ? 'roadmap' : 'hybrid');
}

// 지도 영역 제한 설정
function setMaxBounds() {
  if (!map || !props.maxBounds) {
    return;
  }
  const bounds = {
    north: Math.max(props.maxBounds[1].lat, props.maxBounds[0].lat),
    south: Math.min(props.maxBounds[1].lat, props.maxBounds[0].lat),
    west: Math.min(props.maxBounds[0].lng, props.maxBounds[1].lng),
    east: Math.max(props.maxBounds[0].lng, props.maxBounds[1].lng),
  };
  map.setRestriction({ latLngBounds: bounds });
}

// 마커 클러스터 설정
async function setMarkerClusterer() {
  if (!map) {
    return;
  }

  const markers: any[] = [];

  const renderer = {
    render(cluster: Cluster) {
      const div = document.createElement('div');
      div.classList.add('google-map-cluster');

      const span = document.createElement('span');
      span.innerText = cluster.count > 999 ? '999+' : String(cluster.count);
      div.appendChild(span);

      return new google.maps.marker.AdvancedMarkerElement({
        position: cluster.position,
        title: cluster.count.toString(),
        content: div,
      });
    },
  };

  markerClusterer = new MarkerClusterer({
    map,
    markers,
    onClusterClick: handleClusterClick,
    algorithmOptions: {
      maxZoom: props.maxZoom ?? 18,
      radius: 200,
    } as SuperClusterOptions,
    renderer,
  });

  return Promise.resolve();
}

// 마커 설정
function setMarkers(markers: MapMarker[] = []) {
  if (!markers) {
    return;
  }

  if (!google.maps.marker?.AdvancedMarkerElement) {
    console.error('Undefined google.maps.marker.AdvancedMarkerElement');
    return;
  }

  clearMarkers();

  markers.forEach((_i) => {
    // 지도 모드별 마커 스타일 설정
    const content =
      props.mode === 'setting'
        ? getMarkerSettingStyle(_i)
        : props.mode === 'preview'
          ? getMarkerPreviewStyle(_i)
          : getMarkerStyle(_i);

    const marker = new google.maps.marker.AdvancedMarkerElement({
      map: map,
      position: _i.position,
      title: _i.id,
      content: content,
    });
    marker.dataset.markerData = JSON.stringify(_i);
    marker.dataset.orderby = JSON.stringify(_i.orderby);

    // 마커 클릭 이벤트
    marker.addListener('gmp-click', () => {
      emits('click:marker', _i.id);
    });

    markerClusterer.addMarker(marker);
  });
}

// 기본 모드 마커 스타일
function getMarkerStyle(_i: MapMarker) {
  const marker = document.createElement('div');
  marker.classList.add('google-map-marker');

  const icon = document.createElement('div');
  icon.classList.add('google-map-marker__icon');
  icon.classList.add(_i.status.toLocaleLowerCase());

  const img = document.createElement('img');
  img.src = _i.icon;

  const label = document.createElement('div');
  label.classList.add('google-map-marker__label');
  label.innerText = _i.label;

  icon.appendChild(img);
  marker.appendChild(icon);
  marker.appendChild(label);

  return marker;
}

// 설정 모드 마커 스타일
function getMarkerSettingStyle(_i: MapMarker) {
  const marker = document.createElement('div');
  marker.classList.add('google-map-marker--setting');

  return marker;
}

// 미리보기 모드 마커 스타일
function getMarkerPreviewStyle(_i: MapMarker) {
  const marker = document.createElement('div');
  marker.classList.add('google-map-marker--preview');

  return marker;
}

// 마커 클리어
function clearMarkers() {
  if (!markerClusterer) {
    return;
  }
  markerClusterer.clearMarkers();
}

// 마커 클러스터 클릭 핸들러
function handleClusterClick(_event: google.maps.MapMouseEvent, cluster: Cluster) {
  if (!cluster.marker) {
    return;
  }

  // 중앙으로 이동
  const clusterCenter = { lat: cluster.position.lat(), lng: cluster.position.lng() };
  setCenter(clusterCenter);

  if (infoWindow) {
    infoWindow.close();
  }

  // 정보창 사용하지 않는 경우 이벤트 발생
  if (!props.useInfoWindow) {
    emits('click:cluster', cluster.markers.map((_i) => JSON.parse((_i as any).dataset.markerData)) as MapMarker[]);
    return;
  }

  // 마커 목록 출력
  const div = document.createElement('div');

  const info = document.createElement('div');
  info.classList.add('google-map--info-window');

  cluster.markers.forEach((_i) => {
    const data = JSON.parse((_i as any).dataset.markerData);

    if (data) {
      const dev = document.createElement('div');
      dev.classList.add('google-map--info-window__dev');

      const imgWrapper = document.createElement('div');
      imgWrapper.classList.add('google-map--info-window__img-wrapper');
      imgWrapper.classList.add(data.status.toLocaleLowerCase());

      const img = document.createElement('img');
      img.src = data.icon;

      const label = document.createElement('span');
      label.innerText = data.label;

      imgWrapper.appendChild(img);
      dev.appendChild(imgWrapper);
      dev.appendChild(label);
      dev.setAttribute('onclick', `selectDevInInfoWindow('${data.id}')`);

      info.appendChild(dev);
    }
  });

  div.appendChild(info);

  infoWindow = new google.maps.InfoWindow({
    position: clusterCenter,
    content: div.innerHTML,
    headerDisabled: true,
  });

  infoWindow.open({
    map,
    anchor: cluster.marker,
  });
}

// 정보창에서 장비 선택
function selectDevInInfoWindow(_id: string) {
  if (infoWindow) {
    infoWindow.close();
  }
  setZoom(14);
  emits('select:dev', _id);
}

// 마커 선택 변경
function setSelectedMarker(id: string) {
  const marker = markerClusterer?.markers.find((_i: any) => _i.title === id);
  if (marker && marker.content) {
    marker.content.classList.add('selected');
  }
}

// 마커 선택 초기화
function clearSelectedMarker(id: string) {
  const marker = markerClusterer?.markers.find((_i: any) => _i.title === id);
  if (marker && marker.content) {
    marker.content.classList.remove('selected');
  }
}

// 지도 중앙 설정
function setCenter(center: MapPosition) {
  if (!map) {
    return;
  }

  map.setCenter(center);
}

// 지도 줌 설정
function setZoom(zoom: number) {
  if (!map) {
    return;
  }
  map.setZoom(zoom);
}

// 정보창 열기
function addInfoWindow(element: HTMLElement) {
  const div = document.createElement('div');
  div.appendChild(element);
  infoWindow = new google.maps.InfoWindow({
    position: map.getCenter(),
    content: div.innerHTML,
    headerDisabled: true,
  });

  infoWindow.open({
    map,
    anchor: map.getCenter(),
  });
}

// 정보창 닫기
function closeInfoWindow() {
  if (infoWindow) {
    infoWindow.close();
  }
}

// Kml 지도 설정
function setKmlLayer(kmlText: string) {
  const parser = new DOMParser();
  const kmlDom = parser.parseFromString(kmlText, 'text/xml');

  const geoJsonObject = togeojson.kml(kmlDom);
  kmlFeatures = map.data.addGeoJson(geoJsonObject);
}

// Kml 지도 초기화
function removeKmlLayer() {
  if (kmlFeatures) {
    kmlFeatures.forEach((_f: any) => {
      map.data.remove(_f);
    });
  }
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
  () => props.maxBounds,
  () => {
    setMaxBounds();
  },
);

watch(
  () => props.selectedMarkerId,
  (newVal, oldVal) => {
    if (oldVal) {
      clearSelectedMarker(oldVal);
    }

    if (newVal) {
      setSelectedMarker(newVal);
    }
  },
);

onMounted(async () => {
  await loadMap();
  await initMap();
  emits('load');

  window.selectDevInInfoWindow = selectDevInInfoWindow;
});

onBeforeUnmount(() => {
  window.selectDevInInfoWindow = undefined;
});

defineExpose({
  setZoom,
  setCenter,
  setMarkers,
  clearMarkers,
  addInfoWindow,
  closeInfoWindow,
  setKmlLayer,
  removeKmlLayer,
});
</script>

<template>
  <div class="cm-map-google cm-map__wrapper">
    <div :id="props.id" class="cm-map__map"></div>
  </div>
</template>

<style lang="scss">
// FIXME: 임시로 스타일 작성, 퍼블리싱 수정 필요합니다. - 3/24, devsun
// 마커 스타일
.google-map-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
  &__icon {
    position: relative;
    width: 46px;
    height: 55px;
    &::before {
      content: '';
      display: flex;
      position: absolute;
      left: 50%;
      width: 46px;
      height: 55px;
      background-image: url('@/assets/images/map/map_pin--normal.svg');
      background-size: 46px 55px;
      background-repeat: no-repeat;
      transform: translate(-50%, -5px);
    }
    &.weak::before {
      background-image: url('@/assets/images/map/map_pin--weak.svg');
    }
    &.off::before {
      background-image: url('@/assets/images/map/map_pin--off.svg');
    }
    img {
      position: absolute;
      top: 8px;
      left: 50%;
      transform: translateX(-50%);
      width: 20px;
      height: 20px;
    }
  }
  &__label {
    display: block;
    font: 16px Pretendard;
    font-weight: bold;
    letter-spacing: -2.5%;
    color: #111111;
    margin-top: 0px;
  }
}

// 선택 마커
.google-map-marker.selected {
  .google-map-marker__icon {
    width: 60px;
    height: 78px;
    &::before {
      width: 84px;
      height: 101px;
      background-size: 84px 101px;
      transform: translate(-50%, -5px);
    }
    img {
      top: 20px;
      width: 30px;
      height: 30px;
    }
  }
  .google-map-marker__label {
    display: block;
    margin-top: 8px;
  }
}

// 설정 모드 마커
.google-map-marker--setting {
  width: 16px;
  height: 16px;
  border-radius: 100%;
  background-color: #ff2e98;
  border: 1px solid #f1f1f5;
}

// 미리보기 모드 마커
.google-map-marker--preview {
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: #ff2e98;
  border: 1px solid #f1f1f5;
}

// 마커 클러스터
.google-map-cluster {
  position: relative;
  span {
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, calc(-50% - 6px));
    font: 13px Pretendard;
    font-weight: bold;
    color: white;
  }
  &::before {
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    content: '';
    width: 57px;
    height: 66px;
    background-image: url('@/assets/images/map/map_cluster--normal.svg');
    background-repeat: no-repeat;
    background-size: 57px 66px;
  }
}

// 정보창
.google-map--info-window {
  position: relative;
  padding: 8px;
  max-width: 170px;
  max-height: 280px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
  scrollbar-color: rgba(155, 155, 155, 0.5) #f1f1f1;
  user-select: none;

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
      font-weight: normal;
      font-family: Pretendard;
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

// 구글 정보창 기본 스타일 수정
.gm-style .gm-style-iw-c {
  padding: 0 !important;
}
.gm-style-iw.gm-style-iw-c {
  padding: 0 !important;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: var(--popup-box-shadow);
  transform: translate3d(-50%, calc(-100% - 20px), 0);
  &:has(.preview-info-window) {
    transform: translate3d(-50%, calc(-100% - 30px), 0);
  }
}
.gm-style-iw-tc {
  display: none;
}
.gm-style-iw-d {
  padding: 0;
  max-height: 280px !important;
  overflow: auto !important;
}
</style>
