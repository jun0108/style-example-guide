<script lang="ts" setup>
import dayjs from 'dayjs';

type Props = {
  limit?: number; // sec
};

const props = withDefaults(defineProps<Props>(), {
  limit: 180, // 3min
});

const emits = defineEmits<{
  (e: 'expired'): void;
}>();

const time = ref<number>(0);
let interval: any = undefined;

const displayTime = computed(() => {
  return dayjs(time.value * 1000).format('mm:ss');
});

function startTimer() {
  clearTimer();
  interval = setInterval(() => {
    if (time.value <= 0) {
      emits('expired');
      clearTimer();
      return;
    }
    time.value -= 1;
  }, 1000);
}

function clearTimer() {
  if (interval) {
    clearInterval(interval);
    interval = undefined;
  }
}

function resetTimer() {
  clearTimer();
  time.value = props.limit;
}

watch(
  () => props.limit,
  () => {
    resetTimer();
  },
);

onMounted(() => {
  resetTimer();
});

defineExpose({
  start: startTimer,
  stop: clearTimer,
  reset: resetTimer,
});
</script>

<template>
  <span class="cm-timer">{{ displayTime }}</span>
</template>

<style></style>
