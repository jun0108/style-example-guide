<script lang="ts" setup>
const variants = [
  { value: 'gray', label: 'Gray' },
  { value: 'red', label: 'Red' },
  { value: 'green', label: 'Green' },
  { value: 'orange', label: 'Orange' },
  { value: 'muted', label: 'Muted' },
  { value: 'blue', label: 'Blue' },
  { value: 'primary', label: 'Primary' },
] as const;

const sizes = [
  { value: 'md', label: 'md (28px)' },
  { value: 'sm', label: 'sm (18px)' },
] as const;
</script>

<template>
  <div>
    <h1>칩</h1>

    <h2>Variants</h2>
    <blockquote>variant prop으로 칩 스타일 지정</blockquote>
    <div class="flex flex-wrap items-center gap-3">
      <cm-chip v-for="v in variants" :key="v.value" :variant="v.value">
        {{ v.label }}
      </cm-chip>
    </div>

    <h2>Sizes</h2>
    <blockquote>
      size prop으로 칩 크기 지정 <br />
      기본값 = 'md'
    </blockquote>
    <div class="flex flex-wrap items-center gap-3">
      <cm-chip v-for="s in sizes" :key="s.value" :size="s.value">
        {{ s.label }}
      </cm-chip>
    </div>

    <h2>사용 예시</h2>
    <div class="flex flex-wrap items-center gap-3">
      <cm-chip variant="gray">오프라인</cm-chip>
      <cm-chip variant="green">온라인</cm-chip>
      <cm-chip variant="orange">약전계</cm-chip>
      <cm-chip variant="red">실패</cm-chip>
      <cm-chip variant="blue">게시중</cm-chip>
      <cm-chip variant="muted">비공개</cm-chip>
      <cm-chip variant="primary" size="sm">99</cm-chip>
      <cm-chip variant="disabled" size="sm">0</cm-chip>
    </div>
  </div>
</template>

<style></style>
