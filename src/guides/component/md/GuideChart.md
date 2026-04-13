# Chart

## Props

| 이름    | 타입                  | 기본값      | 필수 | 설명             |
| ------- | --------------------- | ----------- | ---- | ---------------- |
| id      | string                | 랜덤값 생성 |      |                  |
| type    | ChartType             | 'line'      |      | 차트 타입        |
| data    | Record<string, any>[] | []          |      |                  |
| x       | ChartX                |             |      |                  |
| y       | ChartY                | {}          |      |                  |
| series  | ChartSeries[]         |             |      |                  |
| pieSize | string                | '80%'       |      | 파이 차트 사이즈 |

## Expose API

| 이름   | 타입       | 설명          |
| ------ | ---------- | ------------- |
| resize | () => void | 차트 리사이즈 |

## Types

#### ChartType

```ts
type ChartType = 'line' | 'bar' | 'pie' | 'donut' | 'half-donut';
```

#### ChartX

```ts
type ChartX = {
  name: string;
  key: string;
  type?: 'value' | 'category' | 'time' | 'log';
  format?: string;
};
```

#### ChartY

```ts
type ChartY = {
  scale?: boolean;
  showSymbol?: boolean;
  showMinMax?: boolean;
};
```

#### ChartSeries

```ts
type ChartSeries = {
  name: string;
  key: string;
  type?: ChartType;
  color?: string;
};
```

## Usage

별도의 import 없이 사용한다.

### Line

```vue
<script>
// 이하 샘플 데이터 생략
const sampleData = [
  { date: '2026-01-01 00:00:00', temp: 26, hum: 66, type: '81' },
  { date: '2026-01-02 00:00:00', temp: 24, hum: 60, type: '81' },
  { date: '2026-01-03 00:00:00', temp: 27, hum: 62, type: '82' },
  { date: '2026-01-04 00:00:00', temp: 38, hum: 58, type: '81' },
  { date: '2026-01-05 00:00:00', temp: 52, hum: 57, type: '83' },
  { date: '2026-01-06 00:00:00', temp: 60, hum: 56, type: '81' },
  { date: '2026-01-07 00:00:00', temp: 58, hum: 59, type: '81' },
  { date: '2026-01-08 00:00:00', temp: 57, hum: 62, type: '81' },
  { date: '2026-01-09 00:00:00', temp: 59, hum: 60, type: '81' },
  { date: '2026-01-10 00:00:00', temp: 57, hum: 55, type: '81' },
];
</script>
<template>
  <cm-chart
    :x="{
      name: '날짜',
      key: 'date',
    }"
    :series="[{ name: '습도', key: 'hum', color: 'blue' }]"
    :data="sampleData"
  />
</template>
```

### Bar

```vue
<template>
  <cm-chart
    type="bar"
    :x="{
      name: '날짜',
      key: 'date',
    }"
    :series="[{ name: '온도', key: 'temp', color: 'red' }]"
    :data="sampleData"
  />
</template>
```

### Pie

```vue
<template>
  <cm-chart
    type="pie"
    :x="{
      name: '날짜',
      key: 'date',
    }"
    :series="[
      { name: '온도', key: 'temp', color: 'red' },
      { name: '습도', key: 'hum', color: 'blue' },
    ]"
    :data="sampleData"
  />
</template>
```

### Donut

```vue
<template>
  <cm-chart
    type="donut"
    :x="{
      name: '날짜',
      key: 'date',
    }"
    :series="[
      { name: '온도', key: 'temp', color: 'red' },
      { name: '습도', key: 'hum', color: 'blue' },
    ]"
    :data="sampleData"
  />
</template>
```

### Half Donut

```vue
<template>
  <cm-chart
    type="half-donut"
    :x="{
      name: '날짜',
      key: 'date',
    }"
    :series="[
      { name: '온도', key: 'temp', color: 'red' },
      { name: '습도', key: 'hum', color: 'blue' },
    ]"
    :data="sampleData"
  />
</template>
```
