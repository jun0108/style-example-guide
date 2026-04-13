# Map

## Props

| 이름             | 타입                    | 기본값                           | 필수 | 설명           |
| ---------------- | ----------------------- | -------------------------------- | ---- | -------------- |
| v-model:zoom     | number                  | 10                               | 필수 |                |
| v-model:center   | MapPosition             | { lat: 37.53006, lng: 126.9918 } | 필수 |                |
| type             | 'google' \| 'inavi'     | 'google'                         |      |                |
| visibleType      | 'NORMAL' \| 'SATELLITE' | 'NORMAL'                         |      | 지도 출력 타입 |
| maxZoom          | number                  | 18                               |      |                |
| minZoom          | number                  | 9                                |      |                |
| maxBounds        | MapBounds               |                                  |      |                |
| selectedMarkerId | string                  |                                  |      |                |

## Emits

| 이벤트        | 타입                          | 설명              |
| ------------- | ----------------------------- | ----------------- |
| load          | () => void                    | 지도 로드 시      |
| change:center | (center: MapPosition) => void | 지도 화면 이동 시 |
| change:zoom   | (zoom: number) => void        | 지도 줌 변경 시   |
| click:marker  | (Id: string) => void          | 마커 클릭 시      |
| select:dev    | (Id: string) => void          | 장비 선택 시      |

## Expose API

| 이름            | 타입                            | 설명 |
| --------------- | ------------------------------- | ---- |
| zoomIn          | () => void                      |      |
| zoomOut         | () => void                      |      |
| setZoom         | (zoom: number) => void          |      |
| setCenter       | (position: MapPosition) => void |      |
| setMarkers      | (markers: MapMarker[]) => void  |      |
| clearMarkers    | () => void                      |      |
| closeInfoWindow | () => void                      |      |

## Types

#### MapPosition

```ts
type MapPosition = {
  lat: number;
  lng: number;
};
```

#### MapBounds

```ts
type MapBounds = [MapPosition, MapPosition];
```

#### MapMarker

```ts
type MapMarker = {
  id: string;
  position: MapPosition;
  icon: string;
  label: string;
  orderby?: number;
};
```

## Usage

별도의 import 없이 사용한다.

### 기본 사용

```vue
<script>
const center = ref < MapPosition > { lat: 37.53006, lng: 126.9918 };
const zoom = ref(11);

const mapRef = ref();
</script>
<template>
  <cm-map ref="mapRef" v-model:center="center" v-model:zoom="zoom" />
</template>
```
