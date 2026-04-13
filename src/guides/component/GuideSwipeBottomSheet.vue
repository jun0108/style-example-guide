<script lang="ts" setup>
const visible = ref(true);
</script>

<template>
  <div>
    <h1>Swipe Bottom Sheet</h1>

    <div>
      <button class="g-btn--line" @click="visible = true">open</button>
    </div>
    <cm-swipe-bottom-sheet
      v-if="visible"
      :start-offset="200"
      :min-offset="200"
      :snap-offsets="[200, 400]"
      :max-position="10"
      :use-backdrop="true"
    >
      <div class="px-4 flex justify-between">
        <div>내용</div>
        <button class="g-btn--line g-btn--sm" @click="visible = false">닫기</button>
      </div>
    </cm-swipe-bottom-sheet>
  </div>
</template>

<style></style>
