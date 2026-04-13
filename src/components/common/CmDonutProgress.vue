<script lang="ts" setup>
type Props = {
  percentage?: number | string; // 진행률 (0 ~ 100)
  size?: number; // 도넛 차트 전체 크기
  strokeWidth?: number; // 도넛 선의 두께
};

// 기본값 설정
const props = withDefaults(defineProps<Props>(), {
  percentage: 0,
  size: 300,
  strokeWidth: 38,
});

// 한 페이지에 여러 컴포넌트가 쓰일 경우 패턴 ID 충돌을 막기 위한 고유 ID 생성
const patternId = computed(() => `diagonalHatch-${Math.random().toString(36).substring(2, 9)}`);

// SVG 렌더링을 위한 반응형 계산식
const center = computed(() => props.size / 2);
const radius = computed(() => (props.size - props.strokeWidth) / 2);
const circumference = computed(() => 2 * Math.PI * radius.value);

// 퍼센트에 따른 dashoffset 계산 (채워지지 않을 나머지 영역의 길이)
const strokeDashoffset = computed(() => {
  return circumference.value - (parseInt(String(props.percentage)) / 100) * circumference.value;
});
</script>

<template>
  <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern :id="patternId" width="3" height="3" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="8" stroke="#e0e0e0" stroke-width="2" />
      </pattern>
    </defs>

    <circle
      :cx="center"
      :cy="center"
      :r="radius"
      fill="transparent"
      :stroke="`url(#${patternId})`"
      :stroke-width="strokeWidth"
    />

    <circle
      :cx="center"
      :cy="center"
      :r="radius"
      fill="transparent"
      stroke="currentColor"
      :stroke-width="strokeWidth"
      :stroke-dasharray="circumference"
      :stroke-dashoffset="strokeDashoffset"
      :transform="`rotate(-65 ${center} ${center})`"
      class="donut-fill"
    />
  </svg>
</template>

<style scoped>
svg {
  color: var(--color-primary-normal);
}
.donut-fill {
  transition: stroke-dashoffset 0.6s ease-in-out;
}
</style>
