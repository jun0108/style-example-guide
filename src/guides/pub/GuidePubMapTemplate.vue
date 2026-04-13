<script lang="ts" setup>
import PageLayout from '@/components/layout/PageLayout.vue';
const formData = ref({
  page: 1,
  total: 990,
  size: 10,
});
</script>

<template>
  <PageLayout mode="map" title="단말 위치 조회">
    <template #titleUtil> 유틸 항목 여기에 추가 </template>
    여기에 지도 추가
  </PageLayout>
</template>

<style lang="scss" scoped></style>
