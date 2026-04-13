<script lang="ts" setup>
import PageLayout from '@/components/layout/PageLayout.vue';
</script>

<template>
  <PageLayout mode="split-box" title="대시보드 위젯 관리" sub-title="위젯을 추가하거나 편집 및 삭제할 수 있습니다.">
    <template #left> 좌측 영역 내용</template>
    <!-- <template #right> 우측 영역 내용 </template> -->
    <template #rightTop> 우측 상단 내용 </template>
    <template #rightBottom> 우측 하단 내용 </template>
    <template #footer> 버튼이 있는 경우 </template>
  </PageLayout>
</template>

<style lang="scss" scoped></style>
