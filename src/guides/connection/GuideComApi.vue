<script lang="ts" setup>
const X_MID = 'P00000';

const comApi = useComApi();

// ============================================= 임시 로그인
const validate = useValidate();
const noti = useNoti();
const formData = ref({
  custLoginId: '',
  usrLoginId: '',
});

const custLoginIdRef = ref();
const usrLoginIdRef = ref();

async function loginForDev() {
  removeToken();
  removeRefreshToken();
  if (!validate.validateData([custLoginIdRef, usrLoginIdRef])) {
    return;
  }
  try {
    const response = await request.post({
      url: '/login/dev',
      xMid: 'P00000',
      data: formData.value,
    });
    const { auth, refreshAuth } = response.data || {};
    setToken(auth);
    setRefreshToken(refreshAuth);
    noti.show('토큰이 설정되었습니다.');
  } catch (e) {
    console.error(e);
  }
}

// ============================================= 공통 함수
// 공통 코드 조회
async function getCommonCodeList() {
  const codeList = await comApi.getCodeList('GN00000612', X_MID);
  console.log(codeList);
}

// 고객사 목록 조회
async function getCustomerList() {
  const custList = await comApi.getCustomerList(X_MID);
  console.log(custList);
}

// 제조사 목록 조회
async function getManufacturerList() {
  const manfCustList = await comApi.getManufacturerList('P00000');
  console.log(manfCustList);
}

// 고객사의 단말 모델 목록 조회
async function getDevMdlListByCustSeq() {
  const devMdlList = await comApi.getDevMdlListByCustSeq('9', 'P00000');
  console.log(devMdlList);
}

// 단말 속성 정보 조회
async function getDevMdlAttbList() {
  const devMdlAttbList = await comApi.getDevMdlAttbList('P00000');
  console.log(devMdlAttbList);
}
</script>

<template>
  <div>
    <h1>공통 함수</h1>

    <h2>임시 로그인</h2>
    <div class="!p-[16px] border-1 border-gray-300 rounded-md flex flex-col gap-4">
      <v-textfield
        ref="custLoginIdRef"
        v-model="formData.custLoginId"
        label="고객사 아이디"
        required
        required-msg="고객사 아이디를 입력해 주세요"
      />
      <v-textfield
        ref="usrLoginIdRef"
        v-model="formData.usrLoginId"
        label="사용자 아이디"
        required
        required-msg="사용자 아이디를 입력해 주세요"
      />
      <button class="g-btn--line" @click="loginForDev">로그인</button>
    </div>

    <h2>공통 함수</h2>
    <div class="flex flex-wrap items-center gap-4">
      <button class="g-btn--line" @click="getCommonCodeList">공통 코드 조회</button>
      <button class="g-btn--line" @click="getCustomerList">고객사 목록 조회</button>
      <button class="g-btn--line" @click="getManufacturerList">제조사 목록 조회</button>
      <button class="g-btn--line" @click="getDevMdlListByCustSeq">고객사의 단말 모델 목록 조회</button>
      <button class="g-btn--line" @click="getDevMdlAttbList">단말 속성 정보 조회</button>
    </div>
  </div>
</template>

<style></style>
