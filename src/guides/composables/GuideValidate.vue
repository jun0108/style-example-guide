<script lang="ts" setup>
const validate = useValidate();

const formData = ref({
  id: '',
  name: '',
  pwd: '',
  email: '',
  phone: '',
  role: '',
  memo: '',
  skills: [],
  inCompanyYn: '',
  startDt: '',
  useYn: '',
});

const idRef = ref();
const nameRef = ref();
const pwdRef = ref();
const emailRef = ref();
const phoneRef = ref();
const memoRef = ref();
const roleRef = ref();
const skillsRef = ref();
const inCompanyYnRef = ref();
const startDtRef = ref();
const useRef = ref();

function validateRef() {
  const invalidRefs = validate.validateRefs([
    idRef,
    nameRef,
    pwdRef,
    emailRef,
    phoneRef,
    roleRef,
    memoRef,
    skillsRef,
    inCompanyYnRef,
    startDtRef,
    useRef,
  ]);
  if (invalidRefs.length > 0) {
    invalidRefs[0]!.value.focus();
    return;
  }
}

function validateData() {
  const valid = validate.validateData([
    idRef,
    nameRef,
    pwdRef,
    emailRef,
    phoneRef,
    roleRef,
    memoRef,
    skillsRef,
    inCompanyYnRef,
    startDtRef,
    useRef,
  ]);
  if (!valid) {
    return;
  }
}
</script>

<template>
  <div>
    <h1>Validate</h1>

    <div class="flex justify-end items-center mb-5">
      <div class="flex items-center gap-2">
        <button class="g-btn--line" @click="validateRef">ValidateRef</button>
        <button class="g-btn--line" @click="validateData">ValidateData</button>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-3">
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
      <v-textfield
        ref="emailRef"
        v-model="formData.email"
        label="이메일"
        input-format="email"
        format="email"
        format-msg="이메일 형식에 맞게 입력하세요"
      />
      <v-textfield
        ref="phoneRef"
        v-model="formData.phone"
        label="휴대전화"
        maxlength="13"
        input-format="tel"
        format="phone"
        format-msg="전화번호 형식에 맞게 입력하세요"
      />
      <v-select
        ref="roleRef"
        v-model="formData.role"
        label="권한"
        required
        required-msg="권한을 선택하세요"
        :options="[
          { value: '', label: '선택' },
          { value: 'USER', label: '사용자' },
          { value: 'ADMIN', label: '관리자' },
        ]"
      />
    </div>
    <div class="mt-3">
      <v-textarea
        ref="memoRef"
        v-model="formData.memo"
        label="메모"
        required
        required-msg="메모를 입력하세요"
        maxlength="100"
        show-count
      />
    </div>
    <div class="mt-3 grid grid-cols-2 gap-3">
      <v-checkbox
        ref="skillsRef"
        v-model="formData.skills"
        label="기술"
        required
        required-msg="기술을 선택하세요"
        :options="[
          { value: 'JAVA', label: 'JAVA' },
          { value: 'SPRING_BOOT', label: 'Spring boot' },
          { value: 'HTML', label: 'HTML' },
          { value: 'CSS', label: 'CSS' },
          { value: 'JAVASCRIPT', label: 'javascript' },
          { value: 'TYPESCRIPT', label: 'typescript' },
        ]"
      />
      <v-radio
        ref="inCompanyYnRef"
        v-model="formData.inCompanyYn"
        label="재직 여부"
        required
        required-msg="재직 여부를 선택하세요"
        :options="[
          { value: 'Y', label: '재직 중' },
          { value: 'N', label: '퇴사' },
        ]"
      />
      <v-datepicker
        ref="startDtRef"
        v-model="formData.startDt"
        label="시작 일자"
        required
        required-msg="시작일을 선택하세요"
      />
      <v-dropdown
        ref="useRef"
        v-model="formData.useYn"
        label="사용 여부"
        :options="[
          { value: 'Y', label: '사용' },
          { value: 'N', label: '미사용' },
        ]"
        required
        required-msg="사용여부를 선택하세요"
      />
    </div>
    <blockquote>input-format, format은 <span>@/envs.ts</span>를 참고하여 작성하세요</blockquote>
    <blockquote class="mt-10">
      {{ formData }}
    </blockquote>
  </div>
</template>

<style></style>
