<script lang="ts" setup>
import CmBreadcrumb from '@/components/common/CmBreadcrumb.vue';

const mockMenuList = [
  { id: 1, name: 'Depth1', path: '#' },
  { id: 2, name: 'Depth2', path: '#' },
  { id: 3, name: 'Depth3', path: '#' },
  { id: 4, name: 'Depth4', path: '#' },
  { id: 5, name: 'Depth5', path: '#' },
];
</script>

<template>
  <PageLayout mode="single-box" title="Main">
    <template #breadcrumb>
      <CmBreadcrumb :menu-list="mockMenuList" />
    </template>
    <template #content> is home </template>
  </PageLayout>
</template>

<style></style>
