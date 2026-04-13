<script lang="ts" setup>
const noti = useNoti();

function showNoti() {
  noti.show('환영합니다');
}

function showSuccessNoti() {
  noti.success('저장되었습니다');
}

function showWarningNoti() {
  noti.warning('입력 항목을 확인해 주세요');
}

function showErrorNoti() {
  noti.error('서버 오류가 발생했습니다 다시 시도해 주세요');
}
</script>

<template>
  <div>
    <h1>토스트 알림</h1>
    <blockquote><span>success / error</span> 형태를 사용합니다.</blockquote>
    <div class="flex gap-2">
      <!-- <button class="g-btn--line" @click="showNoti">Noti</button> -->
      <button class="g-btn--line" @click="showSuccessNoti">Success</button>
      <!-- <button class="g-btn--line" @click="showWarningNoti">Warning</button> -->
      <button class="g-btn--line" @click="showErrorNoti">Error</button>
    </div>
  </div>
</template>

<style></style>
