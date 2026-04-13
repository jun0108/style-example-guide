# 입력 검증

- `useValidate`를 이용하여 입력 검증을 사용할 수 있다.
- 각 inputs 항목의 validate를 호출하여 입력 검증 결과를 반환한다.

## API Reference

#### validateRefs

```
validateRefs(refs: Ref[]) => Ref[]
```

#### validateData

```
validateData(refs: Ref[]) => boolean
```

| 파라미터 | 타입  | 기본값 | 필수 | 설명                            |
| -------- | ----- | ------ | ---- | ------------------------------- |
| refs     | Ref[] |        | 필수 | 입력 검증할 input 들의 Ref 배열 |

## Usage

```vue
<script>
// 페이지 상단 선언
const validate = useValidate();
</script>
```

### validateRefs

파라미터로 받은 입력 항목의 `validate`를 호출로 입력 검증하여 검증되지 않은 ref[] 를 리턴한다.

```vue
<script>
const validate = useValidate();

const idRef = ref();
const nameRef = ref();
const pwdRef = ref();

function validateReferences() {
  const invalidRefs = validate.validateRefs([
    idRef,
    nameRef,
    pwdRef,
  ]);

  if (invalidRefs.length > 0) { // 리턴받은 refs 배열에 데이터가 있으면 입력검증 실패
    invalidRefs[0]!.value.focus();
    return;
  }
}
</script>
<template>
  <v-textfield
    ref="idRef"
    v-model="formData.id"
    label="아이디"
    required
    required-msg="아이디를 입력하세요"
    maxlength="16"
    input-format="engNumber"
    format="engNumber"
    format-msg="영소문자, 숫자를 이용하여 16자리 이하로 입력하세요"
    desc="영소문자, 숫자를 이용하여 16자리 이하로 입력하세요"
  />
  <v-textfield
    ref="nameRef"
    v-model="formData.name"
    label="이름"
    required
    required-msg="이름을 입력하세요"
    maxlength="30"
    input-format="textSpace"
  />
  <v-textfield
    ref="pwdRef"
    v-model="formData.pwd"
    label="비밀번호"
    type="password"
    required
    required-msg="비밀번호를 입력하세요"
  />
</template>
```

### validateData

파라미터로 받은 입력 항목의 `validate`를 호출로 입력 검증하여 검증 성공 여부를 리턴한다.

```vue
<script>
const validate = useValidate();

const idRef = ref();
const nameRef = ref();
const pwdRef = ref();

function validateReferences() {
  const invalidRefs = validate.validateData([idRef, nameRef, pwdRef]);

  if (!valid) {
    // 검증 결과 true: 성공, false: 실패
    return;
  }
}
</script>
<template>
  <v-textfield
    ref="idRef"
    v-model="formData.id"
    label="아이디"
    required
    required-msg="아이디를 입력하세요"
    maxlength="16"
    input-format="engNumber"
    format="engNumber"
    format-msg="영소문자, 숫자를 이용하여 16자리 이하로 입력하세요"
    desc="영소문자, 숫자를 이용하여 16자리 이하로 입력하세요"
  />
  <v-textfield
    ref="nameRef"
    v-model="formData.name"
    label="이름"
    required
    required-msg="이름을 입력하세요"
    maxlength="30"
    input-format="textSpace"
  />
  <v-textfield
    ref="pwdRef"
    v-model="formData.pwd"
    label="비밀번호"
    type="password"
    required
    required-msg="비밀번호를 입력하세요"
  />
</template>
```

> 입력 항목의 검증 설정은 각 inputs 문서에서 확인 가능
