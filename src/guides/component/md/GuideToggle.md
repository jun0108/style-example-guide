# Toggle

## Props

| 이름       | 타입 | 기본값 | 필수 | 설명 |
| ---------- | ---- | ------ | ---- | ---- |
| v-model    | any  |        |      |      |
| trueValue  | any  | true   |      |      |
| falseValue | any  | false  |      |      |

## Emits

| 이벤트 | 타입       | 설명       |
| ------ | ---------- | ---------- |
| change | () => void | 값 변경 시 |

## Usage

별도의 import 없이 사용한다.

### 기본 사용

```vue
<template>
  <cm-toggle />
</template>
```

### 데이터 바인딩

```vue
<script>
const value = ref('Y');
</script>
<template>
  <cm-toggle v-model="value" true-value="Y" false-value="N" />
</template>
```
