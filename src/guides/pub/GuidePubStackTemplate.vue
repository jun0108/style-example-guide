<script lang="ts" setup>
import PageLayout from '@/components/layout/PageLayout.vue';
const formData = ref({
  page: 1,
  total: 990,
  size: 10,
});
</script>

<template>
  <PageLayout mode="multi-box" :show-back="true" title="스택형 상세">
    여기에 검색 조건 / 그리드 추가
    <template #footer> 버튼이 있는 경우 </template>
  </PageLayout>
</template>

<style lang="scss" scoped></style>
