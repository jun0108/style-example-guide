<script lang="ts" setup>
// FIXME :: 퍼블 추가 컴포넌트
type IconType = 'default' | 'search';

type Props = {
  custom?: boolean;
  height?: string;
  useIcon?: boolean;
  iconType?: IconType;
};

const props = withDefaults(defineProps<Props>(), {
  custom: false,
  height: '100%',
  useIcon: false,
  iconType: 'default',
});
</script>

<template>
  <div class="cm-nodata" :style="{ height: height }">
    <div v-if="useIcon" class="cm-nodata__icon" :class="[iconType === 'default' ? 'is-nodata' : 'is-custom']" />
    <div class="cm-nodata__text">
      <template v-if="!props.custom">
        <p>검색 결과가 없습니다.</p>
        <p>검색 내용을 다시 확인해주세요.</p>
      </template>
      <template v-else>
        <slot></slot>
      </template>
    </div>
  </div>
</template>

<style></style>
