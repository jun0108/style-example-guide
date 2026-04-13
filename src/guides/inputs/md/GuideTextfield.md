# Textfield

## Props

| 이름            | 타입                 | 기본값 | 필수 | 설명                                                             |
| --------------- | -------------------- | ------ | ---- | ---------------------------------------------------------------- |
| v-model         | string \| number     |        |      | 입력 데이터                                                      |
| value           | string               |        |      | 변경 값                                                          |
| type            | 'text' \| 'password' | 'text' |      | 입력 타입                                                        |
| disabled        | boolean              | false  |      |                                                                  |
| readonly        | boolean              | false  |      |                                                                  |
| maxlength       | number \| string     |        |      |                                                                  |
| label           | string               |        |      | 데이터 있는 경우 라벨 출력                                       |
| desc            | string               |        |      | 데이터 있는 경우 설명 출력                                       |
| placeholder     | string               |        |      |                                                                  |
| required        | boolean              | false  |      | 필수 여부                                                        |
| requiredMsg     | string               |        |      | 필수값 오류 시 출력 메시지                                       |
| inputFormat     | string \| RegExp     |        |      | 입력 이벤트 시 사용하는 입력 포맷 / `envs.ts`에 기본 포맷 정의   |
| format          | string \| RegExp     |        |      | 데이터 검증 시 사용하는 데이터 포맷 / `envs.ts`에 기본 포맷 정의 |
| formatMsg       | string               |        |      | 포맷 오류 시 출력 메시지                                         |
| clearable       | boolean              |        |      | 삭제 버튼 제공 여부                                              |
| dataRequiredMsg | string               |        |      | 데이터 검증 후 사용하기 위한 오류 메시지                         |

## Emits

| 이벤트      | 타입                       | 설명             |
| ----------- | -------------------------- | ---------------- |
| input       | (e: Event) => void         |                  |
| keyup       | (e: KeyboardEvent) => void |                  |
| keyup.enter | (e: KeyboardEvent) => void | 엔터 입력 이벤트 |
| blur        | (e: Event) => void         |                  |

## Expose API

| 이름            | 타입                  | 설명                    |
| --------------- | --------------------- | ----------------------- |
| validate        | () => boolean         | 입력 검증               |
| setInvalidMsg   | (msg: string) => void | 입력 오류 메시지 설정   |
| clearInvalidMsg | () => void            | 입력 오류 메시지 초기화 |
| setValidMsg     | (msg: string) => void | 성공 메시지 설정        |
| clearValidMsg   | () => void            | 성공 메시지 초기화      |
| focus           | () => void            | focus                   |
| dataRequiredMsg | string                | 데이터 필수 메시지      |

## Usage

별도의 import 없이 사용

### 기본 사용

```vue
<template>
  <v-textfield />
</template>
```

### 데이터 바인딩

```vue
<script>
const value = ref('');
</script>
<template>
  <v-textfield v-model="value" />
</template>
```

### 라벨 제공

```vue
<template>
  <v-textfield label="이름" />
</template>
```

### 설명 제공

```vue
<template>
  <v-textfield desc="영문 소문자, 숫자를 이용하여 입력해 주세요" />
</template>
```

### placeholder

```vue
<template>
  <v-textfield placeholder="01012345678 형식으로 입력해 주세요" />
</template>
```

### disabled

```vue
<template>
  <v-textfield disabled />
</template>
```

### maxlength

```vue
<template>
  <v-textfield maxlength="30" />
</template>
```

### 입력 제한

`@/envs.ts` 의 `inputsEnv.inputFormats`에 정의된 포맷을 사용하거나 직접 정귝식을 사용하여 작성 할 수 있다.

정규식을 작성하는 경우 `@/envs.ts` 의 `regxsEnv` 에 정의 후 사용을 권장

#### 정의된 포맷 사용:

```vue
<template>
  <v-textfield input-format="number" />
</template>
```

#### 추가 정의 사용

```vue
<script>
import { regxsEnv } from '@/envs.ts';
</script>
<template>
  <v-textfield :input-format="regxsEnv.pwd" />
</template>
```

#### 정규식 사용

```vue
<template>
  <v-textfield :input-format="/[^0-9ㄱ-ㅎ가-힣a-zA-Z!@%^\-_=+{}|;:,./? ]/g" />
</template>
```

### 필수 입력

라벨에 필수 입력 표시(\*)가 제공되고 데이터 검증 시 필수 입력을 검증한다.

```vue
<template>
  <v-textfield required />
</template>
```

#### 필수 입력 검증 메시지

```vue
<template>
  <v-textfield required required-msg="값을 입력해 주세요" />
</template>
```

### 포맷 검증

데이터 검증 시 입력된 데이터의 포맷에 맞는지 검증한다.

포맷은 `@/envs.ts`의 `inputsEnv.validationFormats` 에 정의된 것을 사용하거나 `regxsEnv`에 추가 정의 혹은 직접 정규식을 사용 할 수 있다.

#### 정의된 포맷 사용

```vue
<template>
  <v-textfield format="engNumber" />
</template>
```

#### 추가 정의 사용

```vue
<script>
import { regxsEnv } from '@/envs.ts';
</script>
<template>
  <v-textfield :format="regxsEnv.pwd" />
</template>
```

#### 정규식 사용

```vue
<template>
  <v-textfield :format="/[^0-9ㄱ-ㅎ가-힣a-zA-Z!@%^\-_=+{}|;:,./? ]/g" />
</template>
```

#### 포맷 검증 메시지

```vue
<template>
  <v-textfield format="engNumber" format-msg="영문, 숫자로만 입력해 주세요" />
</template>
```

### 삭제 버튼 제공

```vue
<template>
  <v-textfield clearable />
</template>
```

### 비밀번호

```vue
<template>
  <v-textfield type="password" />
</template>
```
