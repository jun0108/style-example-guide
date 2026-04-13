<script lang="ts" setup>
const modal = useModal();

function goListRef() {
  go('/guide/pub/list-template');
}

function goDashboardRef() {
  go('/guide/pub/dashboard-template');
}

function goSplitDetailRef() {
  go('/guide/pub/split-template');
}

function goStackDetailRef() {
  go('/guide/pub/stack-template');
}

function goMapDetailRef() {
  go('/guide/pub/map-template');
}

// 팝업 예시
// 개인 정보 해제 사유 팝업
function openUnmaskingReasonPopup() {
  modal.open({
    component: () => import('@/pages/com/popup/UnmaskingReasonSelectPopup.vue'),
    options: { width: 'sm' },
    on: {
      apply: (reason: string) => {
        console.log('reason :: ', reason);
      },
      close: () => {
        console.log('close');
      },
    },
  });
}
// 단말 모델 선택 팝업
function openDevMdlSelectPopup() {
  modal.open({
    component: () => import('@/pages/com/popup/DevMdlSelectPopup.vue'),
    options: { width: 'sm' },
    on: {
      apply: (devMdl: ComDevMdl, cust: ComCust) => {
        console.log('devMdl :: ', devMdl, 'cust ::', cust);
      },
    },
  });
}

function openDevMdlDetailPopup() {
  modal.open({
    component: () => import('@/pages/devmdl/popup/DevMdlDetailPopup.vue'),
    options: {
      width: 'sm',
    },
    bind: {},
    on: {},
  });
}
function openDevMdlEditPopup() {
  modal.open({
    component: () => import('@/pages/devmdl/popup/DevMdlEditPopup.vue'),
    options: { width: 'sm' },
    on: {},
  });
}
function openAlarmEditPopup() {
  modal.open({
    component: () => import('@/pages/alarm/popup/AlarmEditPopup.vue'),
    options: {
      width: 'md',
    },
    bind: {},
    on: {},
  });
}
function openReceiverSelectPopup() {
  modal.open({
    component: () => import('@/pages/alarm/popup/ReceiverSelectPopup.vue'),
    options: {
      width: 'sm',
    },
    bind: {},
    on: {},
  });
}
function openAlarmDetailPopup() {
  modal.open({
    component: () => import('@/pages/alarm/popup/AlarmDetailPopup.vue'),
    options: {
      width: 'md',
    },
    bind: {},
    on: {},
  });
}
function openTermsAgreePopup() {
  modal.open({
    component: () => import('@/pages/login/popup/TermsAgreePopup.vue'),
    options: {
      width: 'md',
    },
    bind: {},
    on: {},
  });
}
function openUserDetailPopup() {
  modal.open({
    component: () => import('@/pages/user/popup/UserDetailPopup.vue'),
    options: {
      width: 'sm',
    },
    bind: {},
    on: {},
  });
}
function openUserEditPopup() {
  modal.open({
    component: () => import('@/pages/user/popup/UserCreatePopup.vue'),
    options: {
      width: 'md',
    },
    bind: {},
    on: {},
  });
}
function openSmsSendHistDetailPopup() {
  modal.open({
    component: () => import('@/pages/sms/popup/SmsSendHistDetailPopup.vue'),
    options: {
      width: 'sm',
    },
    bind: {},
    on: {},
  });
}
function openApprovalPopup() {
  modal.open({
    component: () => import('@/pages/approval/popup/ApprovalPopup.vue'),
    options: {
      width: 'md',
    },
    bind: {},
    on: {},
  });
}
function openRejectPopup() {
  modal.open({
    component: () => import('@/pages/approval/popup/RejectPopup.vue'),
    options: {
      width: 'md',
    },
    bind: {},
    on: {},
  });
}
function openApprovalDetailPopup() {
  modal.open({
    component: () => import('@/pages/approval/popup/ApprovalDetailPopup.vue'),
    options: {
      width: 'md',
    },
    bind: {},
    on: {},
  });
}

function openSiteCustModifyPopup() {
  modal.open({
    component: () => import('@/pages/site/popup/SiteCustModifyPopup.vue'),
    options: { width: 'md' },
    bind: {},
    on: {},
  });
}

function openVocDetailPopup() {
  modal.open({
    component: () => import('@/pages/dev/popup/VocDetailPopup.vue'),
    options: { width: 'md' },
    bind: {},
    on: {},
  });
}

function openIconSelectPopup() {
  modal.open({
    component: () => import('@/pages/com/popup/IconSelectPopup.vue'),
    options: { width: 'lg' },
    bind: { isBasicMode: false, iconCd: 'GN00000648' },
    on: {
      apply: (iconCd: string, iconSrc: string, iconFile: File) => {
        console.log(iconCd, iconSrc, iconFile);
      },
    },
  });
}

function openIconSelectPopup2() {
  modal.open({
    component: () => import('@/pages/com/popup/IconSelectPopup.vue'),
    options: { width: 'lg' },
    bind: {},
    on: {
      apply: (iconCd: string, iconSrc: string) => {
        console.log(iconCd, iconSrc);
      },
    },
  });
}
function openCustEditPopup() {
  modal.open({
    component: () => import('@/pages/cust/popup/CustEditPopup.vue'),
    options: { width: 'lg' },
    bind: {},
    on: {},
  });
}
function openManfEditPopup() {
  modal.open({
    component: () => import('@/pages/cust/popup/ManfEditPopup.vue'),
    options: { width: 'lg' },
    bind: {},
    on: {},
  });
}
function openDealEditPopup() {
  modal.open({
    component: () => import('@/pages/cust/popup/DealEditPopup.vue'),
    options: { width: 'lg' },
    bind: {},
    on: {},
  });
}
function openCustDetailPopup() {
  modal.open({
    component: () => import('@/pages/cust/popup/CustDetailPopup.vue'),
    options: { width: 'md' },
    bind: {},
    on: {},
  });
}
function openBaseUploadPopup() {
  modal.open({
    component: () => import('@/pages/base/popup/BaseUploadPopup.vue'),
    options: { width: 'sm' },
    bind: {},
    on: {},
  });
}
function openAuthUserPopup() {
  modal.open({
    component: () => import('@/pages/com/popup/AuthUserPopup.vue'),
    options: {
      width: 'md',
    },
    bind: {},
    on: {},
  });
}
function openPayplanEditPopup() {
  modal.open({
    component: () => import('@/pages/payplan/popup/PayplanEditPopup.vue'),
    options: { width: 'md' },
    bind: {},
    on: {},
  });
}
function openPayplanDetailPopup() {
  modal.open({
    component: () => import('@/pages/payplan/popup/PayplanDetailPopup.vue'),
    options: { width: 'md' },
    bind: {},
    on: {},
  });
}
function openAuthUserModifyPopup() {
  modal.open({
    component: () => import('@/pages/com/popup/AuthUserModifyPopup.vue'),
    options: {
      width: 'md',
    },
    bind: {},
    on: {},
  });
}
function openCustAllocatePopup() {
  modal.open({
    component: () => import('@/pages/manual/popup/CustAllocatePopup.vue'),
    options: { width: 'sm' },
    bind: {},
    on: {},
  });
}
function openDevUploadPopup() {
  modal.open({
    component: () => import('@/pages/manual/popup/DevUploadPopup.vue'),
    options: { width: 'sm' },
    bind: {},
    on: {},
  });
}
</script>

<template>
  <div>
    <h1>퍼블리싱</h1>

    <h2>References</h2>
    <div class="flex flex-wrap items-center gap-2">
      <button class="g-btn--line" @click="goListRef">목록</button>
      <button class="g-btn--line" @click="goDashboardRef">대시보드</button>
      <button class="g-btn--line" @click="goSplitDetailRef">분할형 상세</button>
      <button class="g-btn--line" @click="goStackDetailRef">스택형 상세</button>
      <button class="g-btn--line" @click="goMapDetailRef">지도</button>
    </div>

    <h2>공통 팝업</h2>
    <div class="flex flex-wrap items-center gap-2">
      <button class="g-btn--line" @click="openUnmaskingReasonPopup">개인 정보 해제 사유 팝업</button>
      <button class="g-btn--line" @click="openDevMdlSelectPopup">단말 모델 선택 팝업</button>
      <button class="g-btn--line" @click="openIconSelectPopup2">아이콘 설정 팝업</button>
    </div>

    <h2>자산관리 팝업</h2>
    <div class="flex flex-wrap items-center gap-2">
      <button class="g-btn--line" @click="openDevMdlDetailPopup">단말 모델 정보 확인 팝업</button>
      <button class="g-btn--line" @click="openDevMdlEditPopup">단말 모델 수정 팝업</button>
      <button class="g-btn--line" @click="openAlarmEditPopup">발송 조건 등록 팝업</button>
      <button class="g-btn--line" @click="openReceiverSelectPopup">수신자 선택 팝업</button>
      <button class="g-btn--line" @click="openAlarmDetailPopup">발송 조건 확인 팝업</button>
      <button class="g-btn--line" @click="openVocDetailPopup">상담 이력 상세 팝업</button>
      <button class="g-btn--line" @click="openCustAllocatePopup">고객사 할당 팝업</button>
      <button class="g-btn--line" @click="openDevUploadPopup">단말 모델 정보 업로드 팝업</button>
    </div>

    <h2>로그인 팝업</h2>
    <div class="flex flex-wrap items-center gap-2">
      <button class="g-btn--line" @click="openTermsAgreePopup">약관동의 팝업</button>
    </div>

    <h2>일반 관리 팝업</h2>
    <div class="flex flex-wrap items-center gap-2">
      <button class="g-btn--line" @click="openUserDetailPopup">사용자 정보 조회 팝업</button>
      <button class="g-btn--line" @click="openUserEditPopup">사용자 정보 등록 /수정 팝업 팝업</button>
      <button class="g-btn--line" @click="openSmsSendHistDetailPopup">SMS 발송 내역 상세 팝업</button>
    </div>

    <h2>환경설정 팝업</h2>
    <div class="flex flex-wrap items-center gap-2">
      <button class="g-btn--line" @click="openApprovalPopup">권한 승인 팝업</button>
      <button class="g-btn--line" @click="openRejectPopup">권한 반려 팝업</button>
      <button class="g-btn--line" @click="openApprovalDetailPopup">가입 요청 상세 팝업</button>
    </div>

    <h2>사이트 설정 팝업</h2>
    <div class="flex flex-wrap items-center gap-2">
      <button class="g-btn--line" @click="openSiteCustModifyPopup">고객사 정보 수정 팝업</button>
      <button class="g-btn--line" @click="openIconSelectPopup">아이콘 설정 팝업</button>
    </div>

    <h2>제휴사 관리 팝업</h2>
    <div class="flex flex-wrap items-center gap-2">
      <button class="g-btn--line" @click="openCustEditPopup">고객사 등록/수정 팝업</button>
      <button class="g-btn--line" @click="openManfEditPopup">제조사 등록/수정 팝업</button>
      <button class="g-btn--line" @click="openDealEditPopup">대리점 등록/수정 팝업</button>
      <button class="g-btn--line" @click="openCustDetailPopup">제휴사 정보 조회 팝업</button>
    </div>

    <h2>환경설정 팝업</h2>
    <div class="flex flex-wrap items-center gap-2">
      <button class="g-btn--line" @click="openBaseUploadPopup">기지국 파일 업로드 팝업</button>
    </div>

    <h2>요금제 관리 팝업</h2>
    <div class="flex flex-wrap items-center gap-2">
      <button class="g-btn--line" @click="openPayplanEditPopup">요금 상품 등록/수정 팝업</button>
      <button class="g-btn--line" @click="openPayplanDetailPopup">요금 상품 정보 조회 팝업</button>
    </div>

    <h2>내 정보</h2>
    <div class="flex flex-wrap items-center gap-2">
      <button class="g-btn--line" @click="openAuthUserPopup">내 정보 조회 팝업</button>
      <button class="g-btn--line" @click="openAuthUserModifyPopup">내 정보 수정 팝업</button>
    </div>
  </div>
</template>

<style></style>
