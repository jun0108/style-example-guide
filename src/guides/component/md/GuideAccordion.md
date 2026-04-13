# 아코디언

## Slots

| 이름    | 설명                      |
| ------- | ------------------------- |
| default | 아코디언 컨텐츠 영역      |
| header  | 아코디언 헤더 타이틀 영역 |

## Expose API

| 이름  | 타입       | 설명          |
| ----- | ---------- | ------------- |
| open  | () => void | 아코디언 열기 |
| close | () => void | 아코디언 닫기 |

## Usage

별도의 import 없이 사용한다.

### 기본 사용

```vue
<template>
  <cm-accordion ref="termsRef">
    <template #header> <span class="text-red-600">[필수]</span> 서비스 이용약관</template>

    <div class="terms-sample">컨텐츠 영역</div>
  </cm-accordion>
</template>
```

### Open

```vue
<script>
const accordionRef = ref();

function open() {
  termsRef.value.open();
}
</script>
<template>
  <cm-accordion ref="termsRef">
    <template #header> <span class="text-red-600">[필수]</span> 서비스 이용약관</template>

    <div class="terms-sample">컨텐츠 영역</div>
  </cm-accordion>
</template>
```

### Close

```vue
<script>
const accordionRef = ref();

function close() {
  termsRef.value.close();
}
</script>
<template>
  <cm-accordion ref="termsRef">
    <template #header> <span class="text-red-600">[필수]</span> 서비스 이용약관</template>

    <div class="terms-sample">컨텐츠 영역</div>
  </cm-accordion>
</template>
```
