<script lang="ts" setup>
import { useLayoutStore } from '@/stores/store.layout';

const layoutStore = useLayoutStore();
</script>

<template>
  <div>
    <h1>반응형</h1>

    <blockquote>반응형은 store로 관리, <span>envs.ts</span>에서 기준 사이즈 설정</blockquote>

    <div class="mt-6 p-4 rounded-md bg-gray-100 grid gap-4">
      <div class="flex itmes-center">
        <span class="w-[100px]">레이아웃 타입</span> <b>{{ layoutStore.type }}</b>
      </div>
      <div class="flex itmes-center">
        <span class="w-[100px]">모바일 여부</span> <b>{{ layoutStore.isMobile }}</b>
      </div>
      <div class="flex itmes-center">
        <span class="w-[100px]">PC 여부</span> <b>{{ layoutStore.isPc }}</b>
      </div>
    </div>
  </div>
</template>

<style></style>
