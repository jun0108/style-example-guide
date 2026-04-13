# Checkbox

## Props

| 이름            | 타입                  | 기본값  | 필수 | 설명                                           |
| --------------- | --------------------- | ------- | ---- | ---------------------------------------------- |
| v-model         | any[] \| any          | []      |      |                                                |
| options         | Record<string, any>[] |         |      |                                                |
| labelKey        | string                | 'label' |      | 옵션 데이터 중 라벨로 사용할 키                |
| valueKey        | string                | 'value' |      | 옵션 데이터 중 값으로 사용할 키                |
| label           | string                |         |      | 라벨                                           |
| desc            | string                |         |      | 설명                                           |
| disabled        | boolean               | false   |      |                                                |
| required        | boolean               | false   |      | 필수 여부                                      |
| requiredMsg     | string                |         |      | 필수값 오류 시 출력 메시지                     |
| trueValue       | boolean               |         |      | 단일 체크 박스 사용 시 체크된 경우의 값        |
| falseValue      | boolean               |         |      | 단일 체크 박스 사용 시 체크되지 않은 경우의 값 |
| dataRequiredMsg | string                |         |      | 데이터 검증 후 사용하기 위한 오류 메시지       |

## Emits

| 이벤트 | 타입       | 설명 |
| ------ | ---------- | ---- |
| change | () => void |      |

## Expose API

| 이름            | 타입          | 설명               |
| --------------- | ------------- | ------------------ |
| validate        | () => boolean | 입력 검증          |
| focus           | () => void    | focus              |
| dataRequiredMsg | string        | 데이터 필수 메시지 |

## Usage

별도의 import 없이 사용한다.

### 기본 사용

```vue
<template>
  <v-checkbox
    :options="[
      { value: '1', label: '선택1' },
      { value: '2', label: '선택2' },
    ]"
  />
</template>
```

### 데이터 바인딩

```vue
<script>
const values = ref([]);
</script>
<template>
  <v-checkbox
    v-model="values"
    :options="[
      { value: '1', label: '선택1' },
      { value: '2', label: '선택2' },
    ]"
  />
</template>
```

### 옵션 라벨 및 값

데이터를 옵션으로 사용하는 경우 별도의 변환없이 `label-key`, `value-key` 를 사용한다.

```vue
<script>
const codes = [
  { cdId: '1', cdNm: '코드 1' },
  { cdId: '2', cdNm: '코드 2' },
];
</script>
<template>
  <v-checkbox :options="codes" label-key="cdNm" value-key="cdId" />
</template>
```

### 라벨 제공

```vue
<template>
  <v-checkbox :options="codes" label="이름" />
</template>
```

### 설명 제공

```vue
<template>
  <v-checkbox :options="codes" desc="데이터를 선택해 주세요" />
</template>
```

### disabled

```vue
<template>
  <v-checkbox :options="codes" disabled />
</template>
```

### 필수 입력

라벨에 필수 입력 표시(\*)가 제공되고 데이터 검증 시 필수 입력을 검증한다.

```vue
<template>
  <v-checkbox :options="codes" required />
</template>
```

#### 필수 입력 검증 메시지

```vue
<template>
  <v-checkbox :options="codes" required required-msg="값을 입력해 주세요" />
</template>
```

### 단일 체크박스

```vue
<script>
const value = ref('Y');
</script>
<template>
  <v-checkbox v-model="value" :options="codes" true-value="Y" false-value="N" />
</template>
```
