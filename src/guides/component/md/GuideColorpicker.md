# Colorpicker

## Props

| 이름  | 타입   | 기본값 | 필수 | 설명 |
| ----- | ------ | ------ | ---- | ---- |
| color | string | -      |      |      |

## Emits

| 이벤트 | 타입       | 설명           |
| ------ | ---------- | -------------- |
| close  | () => void | 컬러 피커 닫기 |
| apply  | () => void | 적용           |

## Usage

모달 팝업으로 컴포넌트를 사용한다.

### 기본 사용

```vue
<script>
function openColorpicker() {
  modal.open({
    component: () => import('@/components/common/CmColorpicker.vue'),
    options: {
      width: 'sm',
    },
    bind: {
      color: color.value,
    },
    on: {
      apply: (_color: string) => {
        color.value = _color;
      },
    },
  });
}
</script>
<template>
  <div
    class="w-[50px] h-[50px] border-1 border-gray-300 rounded-sm"
    :style="`background-color: ${color}`"
    @click="openColorpicker"
  ></div>
</template>
```
