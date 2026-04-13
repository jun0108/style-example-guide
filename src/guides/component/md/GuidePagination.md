# 페이지네이션

## Props

| 이름        | 타입                               | 기본값 | 필수 | 설명                      |
| ----------- | ---------------------------------- | ------ | ---- | ------------------------- |
| v-model     | string \| number                   | 1      |      | 현재 페이지               |
| size        | string \| number                   | 10     |      | 한 페이지 당 목록 출력 수 |
| total       | string \| number                   | 0      |      | 전체 개수                 |
| count       | number                             | 10     |      | 페이지 출력 수            |
| sizeOptions | { value: number; label: string }[] |        |      | 페이지당 목록 수 옵션     |

## Emits

| 이벤트      | 타입                   | 설명                 |
| ----------- | ---------------------- | -------------------- |
| change:page | (page: number) => void | 페이지 변경 시       |
| chagne:size | (size: number) => void | 목록 출력 수 변경 시 |
| error       | (msg: string) => void  | 페이지 입력 오류     |

## Usage

별도의 import 없이 사용한다.

### 기본 사용

```vue
<template>
  <cm-pagination :total="formData.total" />
</template>
```

### 데이터 바인딩

```vue
<script>
const formData = ref({
  page: 1,
  total: 990,
  size: 10,
});
</script>
<template>
  <cm-pagination v-model="formData.page" :size="formData.size" :total="formData.total" />
</template>
```

### 페이지 변경 이벤트

```vue
<script>
const formData = ref({
  page: 1,
  total: 990,
  size: 10,
});
function handleChangePage(page: number) {
  console.log(page);
}
</script>
<template>
  <cm-pagination :total="formData.total" @change:page="handleChangePage" />
</template>
```

### 목록 출력 수 변경 이벤트

```vue
<script>
const formData = ref({
  page: 1,
  total: 990,
  size: 10,
});
function handleChangeSize(size: number) {
  console.log(size);
}
</script>
<template>
  <cm-pagination :total="formData.total" @change:size="handleChangeSize" />
</template>
```

### 입력 오류 이벤트

```vue
<script>
const formData = ref({
  page: 1,
  total: 990,
  size: 10,
});
function handleError(msg: string) {
  console.error(msg);
}
</script>
<template>
  <cm-pagination :size="formData.size" @error="handleError" />
</template>
```
