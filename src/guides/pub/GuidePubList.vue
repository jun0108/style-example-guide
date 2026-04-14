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
  </div>
</template>

<style></style>
