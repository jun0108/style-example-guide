<script lang="ts" setup>
const dialog = useDialog();

function alert() {
  dialog.alert('유효 시간이 만료되었습니다.\r\n관리자에게 문의하세요.').then(() => {
    console.log('확인');
  });
}

function confirm() {
  dialog
    .confirm('입력된 내용을 저장하시겠습니까?')
    .then(() => {
      console.log('확인');
    })
    .catch(() => {
      console.log('취소');
    });
}

function confirmAdditional() {
  dialog.confirm('수정을 취소하시겠습니까?', {
    additionalMsg: '수정 취소 시, 변경 사항은 저장되지 않습니다.',
  });
}
</script>

<template>
  <div>
    <h1>다이얼로그</h1>
    <div class="flex gap-2">
      <button class="g-btn--solid" @click="alert">알림</button>
      <button class="g-btn--line" @click="confirm">확인</button>
      <button class="g-btn--line" @click="confirmAdditional">추가 정보 확인</button>
    </div>
  </div>
</template>

<style></style>
