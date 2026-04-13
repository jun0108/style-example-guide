# 탭

## Props

| 이름    | 타입  | 기본값 | 필수 | 설명 |
| ------- | ----- | ------ | ---- | ---- |
| v-model | any   |        |      |      |
| tabs    | Tab[] | []     | 필수 |      |

## Emits

| 이벤트 | 타입       | 설명       |
| ------ | ---------- | ---------- |
| change | () => void | 탭 변경 시 |

## Type

#### Tab

```ts
type Tab = {
  name: string;
  key: string;
};
```

## Usage

별도의 import 없이 사용한다.

### 기본 사용

```vue
<template>
  <cm-tab
    :tabs="[
      { name: '발송 현황', key: 'status' },
      { name: '발송 내역', key: 'history' },
    ]"
  />
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

### 탭 사용

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
  <div v-if="activeTab === 'status'" class="p-6 w-full h-[350px] bg-gray-100">발송 현황 탭</div>
  <div v-if="activeTab === 'history'" class="p-6 w-full h-[350px] bg-pink-100">발송 내역 탭</div>
  <div v-if="activeTab === 'setting'" class="p-6 w-full h-[350px] bg-blue-100">발송 조건 설정 탭</div>
</template>
```
