# Swipe Bottom Sheet

별도의 import 없이 사용한다.

## Props

| 이름        | 타입     | 기본값     | 필수 | 설명                         |
| ----------- | -------- | ---------- | ---- | ---------------------------- |
| startOffset | number   | 200        |      | 시작 오프셋 (하단 기준)      |
| minOffset   | number   | 200        |      | 최소 오프셋 (하단 기준)      |
| snapOffsets | number[] | [200, 500] |      | 스냅 오프셋 목록 (하단 기준) |
| maxPosition | number   | 0          |      | 최대 위치(상단 기준)         |
| useBackdrop | boolean  | true       |      | 배경 사용 여부               |

## Slots

| 이름    | 설명           |
| ------- | -------------- |
| default | 바텀 시트 내용 |

## Usage

### 기본 사용

```vue
<template>
  <cm-swipe-bottom-sheet
    :start-offset="200"
    :min-offset="200"
    :snap-offsets="[200, 400]"
    :max-position="10"
    :use-backdrop="true"
  >
    <div>내용</div>
  </cm-swipe-bottom-sheet>
</template>
```

### 데이터 바인딩

```vue
<script>
const tabs = [
  { name: '발송 현황', key: 'status' },
  { name: '발송 내역', key: 'history' },
  { name: '발송 조건 설정', key: 'setting' },
];

const activeTab = ref('status');
</script>
<template>
  <cm-tab v-model="activeTab" :tabs="tabs" />
</template>
```

### 탭 변경 이벤트

```vue
<script>
const tabs = [
  { name: '발송 현황', key: 'status' },
  { name: '발송 내역', key: 'history' },
  { name: '발송 조건 설정', key: 'setting' },
];

const activeTab = ref('status');

function handleChange() {
  console.log('change tab');
}
</script>
<template>
  <cm-tab v-model="activeTab" :tabs="tabs" @change="handleChange" />
</template>
```
