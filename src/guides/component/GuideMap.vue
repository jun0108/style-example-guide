<script lang="ts" setup>
const icon =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiMyMTlGMDIiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zMi4yMjIyIDI3TDM4Ljg4ODkgMTdIMjYuNjY2N0wyMCAzMy42NjY3SDI4LjcwMTFMMjMuMzg2NyA0NS4wNTQ0QzIzLjA3NzggNDUuNjczMyAyMy44NzExIDQ2LjI0ODkgMjQuMzYyMiA0NS43NjMzTDQxLjExMTEgMjdIMzIuMjIyMloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=';
const MARKERS = [
  {
    id: Math.random().toString().substring(10),
    position: { lat: 37.5600041492534, lng: 126.83434372216867 },
    icon,
    label: 'MARKER-1 퀸즈파크텐',
    orderby: 3,
  },
  {
    id: Math.random().toString().substring(10),
    position: { lat: 37.530858026109264, lng: 126.8921862632467 },
    icon,
    label: 'MARKER-2',
    orderby: 4,
  },
  {
    id: Math.random().toString().substring(10),
    position: { lat: 37.530858026109264, lng: 126.8921862632467 },
    icon,
    label: 'MARKER-2',
    orderby: 4,
  },
  {
    id: Math.random().toString().substring(10),
    position: { lat: 37.530858026109264, lng: 126.8921862632467 },
    icon,
    label: 'MARKER-2',
    orderby: 4,
  },
  {
    id: Math.random().toString().substring(10),
    position: { lat: 37.530858026109264, lng: 126.8921862632467 },
    icon,
    label: 'MARKER-2',
    orderby: 4,
  },
  {
    id: Math.random().toString().substring(10),
    position: { lat: 37.530858026109264, lng: 126.8921862632467 },
    icon,
    label: 'MARKER-2',
    orderby: 4,
  },
  {
    id: Math.random().toString().substring(10),
    position: { lat: 37.530858026109264, lng: 126.8921862632467 },
    icon,
    label: 'MARKER-2',
    orderby: 4,
  },
  {
    id: Math.random().toString().substring(10),
    position: { lat: 37.530858026109264, lng: 126.8921862632467 },
    icon,
    label: 'MARKER-2',
    orderby: 4,
  },
  {
    id: Math.random().toString().substring(10),
    position: { lat: 37.530858026109264, lng: 126.8921862632467 },
    icon,
    label: 'MARKER-2',
    orderby: 4,
  },
  {
    id: Math.random().toString().substring(10),
    position: { lat: 37.530858026109264, lng: 126.8921862632467 },
    icon,
    label: 'MARKER-2',
    orderby: 4,
  },
  {
    id: Math.random().toString().substring(10),
    position: { lat: 37.530858026109264, lng: 126.8921862632467 },
    icon,
    label: 'MARKER-2',
    orderby: 4,
  },
  {
    id: Math.random().toString().substring(10),
    position: { lat: 37.530858026109264, lng: 126.8921862632467 },
    icon,
    label: 'MARKER-2',
    orderby: 4,
  },
];

const type = ref('inavi');
const visibleType = ref('NORMAL');

const center = ref<MapPosition>({ lat: 37.53006, lng: 126.9918 });
const zoom = ref(11);
const selectedMarkerId = ref<string | undefined>();

const maxBounds = ref<MapBounds>([
  { lat: 32.10169371688633, lng: 125.70344586341935 },
  { lat: 38.69791347012051, lng: 131.8927289269979 },
]);

const mapRef = ref();

// 축소
function zoomOut() {
  mapRef.value.zoomOut();
}

// 확대
function zoomIn() {
  mapRef.value.zoomIn();
}

// 포커스
function focusDev() {
  mapRef.value.setZoom(18);
  mapRef.value.setCenter(MARKERS[0]!.position);
  selectedMarkerId.value = MARKERS[0]!.id;
}

// 지로 로드 핸들러
function handleLoad() {
  console.log('loaded');
  mapRef.value.setMarkers(MARKERS);
}

// 지도 중앙 이동 핸들러
function handleChangeCenter(_center: MapPosition) {
  console.log('change center', _center);
}

// 지도 줌 변경 핸들러
function handleChangeZoom(_zoom: number) {
  console.log('change zoom', _zoom);
}

// 마커 클릭 핸들러
function handleClickMarker(_id: string) {
  console.log('clicked marker', _id);
  selectedMarkerId.value = _id;

  const marker = MARKERS.find((_i) => _i.id === _id);
  if (!marker) {
    return;
  }
  mapRef.value.setZoom(15);
  mapRef.value.setCenter(marker.position);
}

// 장비 선택 핸들러
function handleSelectDev(_id: string) {
  console.log('selected dev', _id);
}
</script>

<template>
  <div>
    <h1>지도</h1>
    <div class="flex items-center gap-4">
      <v-dropdown
        v-model="type"
        :options="[
          { value: 'google', label: '구글' },
          { value: 'inavi', label: '아이나비' },
        ]"
        class="!w-fit"
      />
      <v-dropdown
        v-model="visibleType"
        :options="[
          { value: 'NORMAL', label: '일반 지도' },
          { value: 'SATELLITE', label: '위성 지도' },
        ]"
        class="!w-fit"
      />
      <div class="flex items-center gap-2">
        <button class="g-btn--line" @click="zoomOut">축소</button>
        <button class="g-btn--line" @click="zoomIn">확대</button>

        <button class="g-btn--line" @click="focusDev">focus</button>
      </div>
    </div>

    <div class="mt-4 h-[500px]">
      <!-- 지도-->
      <cm-map
        ref="mapRef"
        v-model:center="center"
        v-model:zoom="zoom"
        :type="type"
        :visible-type="visibleType"
        :max-bounds="maxBounds"
        :selected-marker-id="selectedMarkerId"
        @load="handleLoad"
        @change:center="handleChangeCenter"
        @change:zoom="handleChangeZoom"
        @click:marker="handleClickMarker"
        @select:dev="handleSelectDev"
      />
      <!-- // 지도 -->
    </div>

    <div class="box flex flex-col gap-3 mt-4">
      <div class="flex items-center gap-3">
        <span class="text-(--color-text-60) w-[60px]">center</span>
        <div>{{ center }}</div>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-(--color-text-60) w-[60px]">zoom</span>
        <div>{{ zoom }}</div>
      </div>
    </div>

    <!-- 지도 마크 & 팝오버 예시 (추후 지도 위 마크/팝오버 디자인 가이드) -->
    <section class="mt-10">
      <h2 class="text-xl font-semibold mb-4">지도 마크 & 팝오버 예시</h2>

      <div class="flex flex-wrap items-end gap-8 mb-8">
        <!-- 작은 마크, 라벨 없음 -->
        <div class="flex flex-col items-center gap-1">
          <span class="text-sm text-neutral-500">작은 마크 (라벨 없음)</span>
          <div class="location-marker location-marker--sm">
            <div class="location-marker__pin-wrap">
              <svg
                class="location-marker__pin"
                viewBox="0 0 40 50"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M20 0C8.954 0 0 8.954 0 20c0 15 20 30 20 30s20-15 20-30C40 8.954 31.046 0 20 0z"
                  fill="white"
                />
              </svg>
              <span class="location-marker__circle device-status-icon device-status-icon--online" aria-hidden="true" />
            </div>
          </div>
        </div>
        <!-- 작은 마크, 라벨 있음 -->
        <div class="flex flex-col items-center gap-1">
          <span class="text-sm text-neutral-500">작은 마크 (라벨 있음)</span>
          <div class="location-marker location-marker--sm">
            <div class="location-marker__pin-wrap">
              <svg
                class="location-marker__pin"
                viewBox="0 0 40 50"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M20 0C8.954 0 0 8.954 0 20c0 15 20 30 20 30s20-15 20-30C40 8.954 31.046 0 20 0z"
                  fill="white"
                />
              </svg>
              <span class="location-marker__circle device-status-icon device-status-icon--online" aria-hidden="true" />
            </div>
            <div class="location-marker__label">0120000000000</div>
          </div>
        </div>
        <!-- 큰 마크, 라벨 없음 -->
        <div class="flex flex-col items-center gap-1">
          <span class="text-sm text-neutral-500">큰 마크 (라벨 없음)</span>
          <div class="location-marker location-marker--lg">
            <div class="location-marker__pin-wrap">
              <svg
                class="location-marker__pin"
                viewBox="0 0 40 50"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M20 0C8.954 0 0 8.954 0 20c0 15 20 30 20 30s20-15 20-30C40 8.954 31.046 0 20 0z"
                  fill="white"
                />
              </svg>
              <span class="location-marker__circle device-status-icon device-status-icon--online" aria-hidden="true" />
            </div>
          </div>
        </div>
        <!-- 큰 마크, 라벨 있음 -->
        <div class="flex flex-col items-center gap-1">
          <span class="text-sm text-neutral-500">큰 마크 (라벨 있음)</span>
          <div class="location-marker location-marker--lg">
            <div class="location-marker__pin-wrap">
              <svg
                class="location-marker__pin"
                viewBox="0 0 40 50"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M20 0C8.954 0 0 8.954 0 20c0 15 20 30 20 30s20-15 20-30C40 8.954 31.046 0 20 0z"
                  fill="white"
                />
              </svg>
              <span class="location-marker__circle device-status-icon device-status-icon--online" aria-hidden="true" />
            </div>
            <div class="location-marker__label">0120000000000</div>
          </div>
        </div>
        <!-- 상태별: warning, offline -->
        <div class="flex flex-col items-center gap-1">
          <span class="text-sm text-neutral-500">경고</span>
          <div class="location-marker location-marker--sm">
            <div class="location-marker__pin-wrap">
              <svg
                class="location-marker__pin"
                viewBox="0 0 40 50"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M20 0C8.954 0 0 8.954 0 20c0 15 20 30 20 30s20-15 20-30C40 8.954 31.046 0 20 0z"
                  fill="white"
                />
              </svg>
              <span class="location-marker__circle device-status-icon device-status-icon--warning" aria-hidden="true" />
            </div>
          </div>
        </div>
        <div class="flex flex-col items-center gap-1">
          <span class="text-sm text-neutral-500">오프라인</span>
          <div class="location-marker location-marker--sm">
            <div class="location-marker__pin-wrap">
              <svg
                class="location-marker__pin"
                viewBox="0 0 40 50"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M20 0C8.954 0 0 8.954 0 20c0 15 20 30 20 30s20-15 20-30C40 8.954 31.046 0 20 0z"
                  fill="white"
                />
              </svg>
              <span class="location-marker__circle device-status-icon device-status-icon--offline" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style></style>
