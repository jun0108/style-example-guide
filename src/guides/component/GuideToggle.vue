<script lang="ts" setup>
// 1. 기본
const basic = ref(false);

// 2. 내부 레이블 (inline)
const innerOff = ref(false);
const innerOn = ref(true);

// 3. 박스 (box)
const boxOff = ref(false);
const boxOn = ref(true);
</script>

<template>
  <div>
    <h1>토글 (Toggle)</h1>

    <!-- 1. 기본 -->
    <h2>1. 기본 (Basic)</h2>
    <div class="flex items-center gap-6">
      <div class="form-toggle">
        <label>Text</label>
        <cm-toggle v-model="basic" />
      </div>
      <div class="form-toggle is-disabled">
        <label>Text</label>
        <cm-toggle v-model="basic" disabled />
      </div>
    </div>

    <!-- 2. 내부 레이블 -->
    <h2>2. 내부 레이블 (Inner Label)</h2>
    <blockquote><span>cm-toggle--inline</span> 으로 토글 트랙 내부에 ON/OFF 텍스트를 표시합니다.</blockquote>
    <div class="flex items-center gap-6">
      <cm-toggle v-model="innerOff" class="cm-toggle--inline" />
      <cm-toggle v-model="innerOn" class="cm-toggle--inline" />
      <cm-toggle :model-value="false" class="cm-toggle--inline" disabled />
      <cm-toggle :model-value="true" class="cm-toggle--inline" disabled />
    </div>

    <!-- 3. 박스 -->
    <h2>3. 박스 (Box)</h2>
    <blockquote><span>form-toggle--box</span>로 토글을 박스 형태로 표시합니다.</blockquote>
    <div class="flex items-center gap-6">
      <div class="form-toggle form-toggle--box" :class="{ 'is-active': boxOff }">
        <cm-toggle v-model="boxOff" />
        <label>Text</label>
      </div>
      <div class="form-toggle form-toggle--box" :class="{ 'is-active': boxOn }">
        <cm-toggle v-model="boxOn" />
        <label>Text</label>
      </div>
      <div class="form-toggle form-toggle--box is-disabled">
        <cm-toggle :model-value="false" disabled />
        <label>Text</label>
      </div>
      <div class="form-toggle form-toggle--box is-disabled is-active">
        <cm-toggle :model-value="true" disabled />
        <label>Text</label>
      </div>
    </div>
  </div>
</template>

<style></style>
