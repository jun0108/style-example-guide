<script lang="ts" setup>
import PageLayout from '@/components/layout/PageLayout.vue';
const formData = ref({
  page: 1,
  total: 990,
  size: 10,
});
</script>

<template>
  <PageLayout mode="grid" title="내 대시보드">
    <template #titleUtil> 유틸 항목 여기에 추가 </template>
    여기에 그리드 추가
  </PageLayout>
</template>

<style lang="scss" scoped></style>
