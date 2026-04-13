<script lang="ts" setup>
import Hammer from 'hammerjs';
import { useWindowSize } from '@vueuse/core';

type Props = {
  startOffset?: number;
  minOffset?: number;
  snapOffsets?: number[];
  maxPosition?: number;
  useBackdrop?: boolean;
  wrapperClass?: string;
};

const { height: windowHeight } = useWindowSize();

const props = withDefaults(defineProps<Props>(), {
  startOffset: 200,
  minOffset: 200,
  snapOffsets: () => [200, 500],
  maxPosition: 0,
  useBackdrop: true,
  wrapperClass: '',
});

const emit = defineEmits<{
  (e: 'update:expanded', expanded: boolean): void; // 시트 상단이 maxPosition(전체 높이)에 붙었을 때 true
}>();

const positionY = ref<number>();

const headerRef = ref();

let headerHammer = null;

// 초기화
function init() {
  headerHammer = new Hammer(headerRef.value, {});
  headerHammer.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });
  headerHammer.on('panup pandown', (event) => {
    setPositionY(event.center.y);
  });
  headerHammer.on('panend', (event) => {
    setPositionY(event.center.y);
    nextTick(() => {
      moveToNeareatSnapOffset(event.center.y);
    });
  });
}

// 위치 설정
function setPositionY(y: number) {
  if (y < props.maxPosition) {
    positionY.value = props.maxPosition;
    return;
  } else if (y > windowHeight.value - props.minOffset) {
    positionY.value = windowHeight.value - props.minOffset;
    return;
  }
  positionY.value = y;
}

// offset 으로 높이 계산
function getHeight(offset: number) {
  return windowHeight.value - offset;
}

// 근처 snapoffset 으로 이동
function moveToNeareatSnapOffset(y: number) {
  const snapPosition = [...props.snapOffsets.map((_o) => getHeight(_o)), props.maxPosition];
  const diffHeights = snapPosition.map((_h) => Math.abs(y - _h));
  const index = diffHeights.indexOf(Math.min(...diffHeights));
  if (snapPosition[index] != undefined) {
    setPositionY(snapPosition[index]);
  }
}

// 창 축소 - startOffset
function collapse() {
  setPositionY(getHeight(props.startOffset));
}

// 창 확대 - maxPosition
function expand() {
  setPositionY(props.maxPosition);
}

watch(positionY, (y) => {
  if (y === undefined) {
    return;
  }
  emit('update:expanded', y === props.maxPosition);
});

onMounted(() => {
  init();
  setPositionY(getHeight(props.startOffset));
});

defineExpose({
  collapse,
  expand,
});
</script>

<template>
  <teleport to="body">
    <div class="cm-swipe-bottomsheet__wrapper" :class="[wrapperClass]">
      <div v-if="useBackdrop" class="cm-swipe-bottomsheet__backdrop"></div>
      <div class="cm-swipe-bottomsheet" :style="{ '--sbs-offsetTop': positionY + 'px' }">
        <div ref="headerRef" class="cm-swipe-bottomsheet__header"></div>
        <div class="cm-swipe-bottomsheet__content">
          <slot></slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style></style>
