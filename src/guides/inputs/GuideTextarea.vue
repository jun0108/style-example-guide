<script lang="ts" setup>
const textareaDisabled = ref('메모 내용');
</script>

<template>
  <div>
    <h1>Textarea</h1>
    <div class="grid grid-cols-2 gap-3">
      <v-textarea label="메모" required />
      <v-textarea label="메모" maxlength="10" />
      <v-textarea label="메모" placeholder="입력해 주세요" />
      <v-textarea label="메모" rows="3" />
      <v-textarea v-model="textareaDisabled" maxlength="10" label="메모" disabled />
      <v-textarea label="메모" resizable />
      <v-textarea rows="7" maxlength="100" placeholder="반려 사유를 입력해 주세요." />
    </div>
  </div>
</template>

<style></style>
