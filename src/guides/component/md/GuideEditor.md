# Editor

## Props

| 이름        | 타입   | 기본값                | 필수 | 설명        |
| ----------- | ------ | --------------------- | ---- | ----------- |
| height      | string | 400px                 |      | 에디터 높이 |
| placeholder | string | 내용을 입력해 주세요. |      |             |

## Emits

| 이벤트 | 타입       | 설명                |
| ------ | ---------- | ------------------- |
| ready  | () => void | 에디터 준비 완료    |
| change | () => void | 에디터 내용 변경 시 |

## Expose API

| 이름         | 타입                      | 설명          |
| ------------ | ------------------------- | ------------- |
| setContent   | (content: string) => void | 내용 설정     |
| getContent   | () => string              | 내용 가져오기 |
| clearContent | () => void                | 내용 초기화   |

## Usage

별도의 import 없이 사용한다.

### 기본 사용

```vue
<script>
const editorRef = ref();
</script>
<template>
  <cm-editor ref="editorRef" />
</template>
```

### 내용 설정

```vue
<script>
const editorRef = ref();

function setContent() {
  editorRef.value.setContent(EXAMPLE_CONTENT);
}
</script>
<template>
  <cm-editor ref="editorRef" />
</template>
```

### 내용 가져오기

```vue
<script>
const content = ref('');
const editorRef = ref();

function getContent() {
  content.value = editorRef.value.getContent();
}
</script>
<template>
  <cm-editor ref="editorRef" />
</template>
```

### 내용 초기화

```vue
<script>
const editorRef = ref();

function clearContent() {
  editorRef.value.clearContent();
}
</script>
<template>
  <cm-editor ref="editorRef" />
</template>
```
