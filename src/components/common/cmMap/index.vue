<script lang="ts" setup>
import { locationMapEnv } from '@/envs';
import type { MapMode, MapType, MapVisibleType } from '@/types/common/type.map';

const ZOOM_STEP = 1;

type Props = {
  mode?: MapMode;
  type?: MapType;
  visibleType?: MapVisibleType;
  maxZoom?: number;
  minZoom?: number;
  maxBounds?: MapBounds;
  selectedMarkerId?: string;
  useInfoWindow?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  type: 'inavi',
  visibleType: 'NORMAL',
  maxZoom: locationMapEnv.maxZoom,
  minZoom: locationMapEnv.minZoom,
  mode: 'default',
  useInfoWindow: true,
});

const zoom = defineModel<number>('zoom', {
  default: locationMapEnv.defaultZoom,
});

const center = defineModel<MapPosition>('center', {
  default: () => {
    return { lat: locationMapEnv.defaultCenter.lat, lng: locationMapEnv.defaultCenter.lng };
  },
});

const emits = defineEmits<{
  (e: 'load'): void;
  (e: 'change:center', center: MapPosition): void;
  (e: 'change:zoom', zoom: number): void;
  (e: 'click:marker', id: string): void;
  (e: 'select:dev', id: string): void;
  (e: 'click:cluster', markers: MapMarker[]): void;
}>();

const mapRef = ref();

// 지도 로드 핸들러
function handleLoad() {
  emits('load');
}

// 지도 중앙 이동 핸들러
function handleChangeCenter(_center: MapPosition) {
  center.value = _center;
  emits('change:center', _center);
}

// 지도 줌 변경 핸들러
function handleChangeZoom(_zoom: number) {
  emits('change:zoom', _zoom);
}

// 마커 클릭 핸들러
function handleClickMarker(_id: string) {
  emits('click:marker', _id);
}

// 정보창에서 장비 선택
function handleSelectDev(_id: string) {
  emits('select:dev', _id);
}

// 클러스터 클릭 핸들러
function handleClickCluster(markers: MapMarker[]) {
  emits('click:cluster', markers);
}

// ---------------------------------------- 동작 ----------------------------------------
// 줌인
function zoomIn() {
  if (zoom.value + ZOOM_STEP <= props.maxZoom) {
    zoom.value += ZOOM_STEP;
  }
}

// 줌 아웃
function zoomOut() {
  if (zoom.value - ZOOM_STEP >= props.minZoom) {
    zoom.value -= ZOOM_STEP;
  }
}

// 줌 설정
function setZoom(_zoom: number) {
  let _z = _zoom;
  if (_z < props.minZoom) {
    _z = props.minZoom;
  }
  if (_z > props.maxZoom) {
    _z = props.maxZoom;
  }

  zoom.value = _z;
}

// 선터 이동
function setCenter(_position: MapPosition) {
  mapRef.value.setCenter(_position);
}

// 마커 세팅
function setMarkers(_markers: MapMarker[]) {
  mapRef.value.setMarkers(_markers);
}

// 마커 초기화
function clearMarkers() {
  mapRef.value.clearMarkers();
}

// 정보창 열기
function addInfoWindow(element: HTMLElement) {
  mapRef.value.addInfoWindow(element);
}

// 정보창 닫기
function closeInfoWindow() {
  mapRef.value.closeInfoWindow();
}

// kml 설정
function setKmlLayer(url: string) {
  mapRef.value.setKmlLayer(url);
}

// kml 삭제
function removeKmlLayer() {
  mapRef.value.removeKmlLayer();
}

// 뷰 리프레시
function refreshView() {
  if (mapRef.value.refreshView) {
    mapRef.value.refreshView();
  }
}

defineExpose({
  zoomIn,
  zoomOut,
  setZoom,
  setCenter,
  setMarkers,
  clearMarkers,
  addInfoWindow,
  closeInfoWindow,
  setKmlLayer,
  removeKmlLayer,
  refreshView,
});
</script>

<template>
  <div class="cm-map">
    <google-map
      v-if="props.type === 'google'"
      ref="mapRef"
      :mode="props.mode"
      :visible-type="props.visibleType"
      :center="center"
      :zoom="zoom"
      :min-zoom="props.minZoom"
      :max-zoom="props.maxZoom"
      :max-bounds="maxBounds"
      :selected-marker-id="props.selectedMarkerId"
      :use-info-window="props.useInfoWindow"
      @load="handleLoad"
      @change:center="handleChangeCenter"
      @change:zoom="handleChangeZoom"
      @click:marker="handleClickMarker"
      @select:dev="handleSelectDev"
      @click:cluster="handleClickCluster"
    />
    <inavi-map
      v-else
      ref="mapRef"
      :mode="props.mode"
      :visible-type="props.visibleType"
      :center="center"
      :zoom="zoom"
      :min-zoom="props.minZoom"
      :max-zoom="props.maxZoom"
      :max-bounds="maxBounds"
      :selected-marker-id="props.selectedMarkerId"
      :use-info-window="props.useInfoWindow"
      @load="handleLoad"
      @change:center="handleChangeCenter"
      @change:zoom="handleChangeZoom"
      @click:marker="handleClickMarker"
      @select:dev="handleSelectDev"
      @click:cluster="handleClickCluster"
    />
  </div>
</template>

<style></style>
