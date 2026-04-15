<script lang="ts" setup>
import { type NotiInstanceOptions } from './type.noti';

const notiSuccessIcon = `${import.meta.env.BASE_URL}images/icon/circle-check__fill.svg`;
const notiErrorIcon = `${import.meta.env.BASE_URL}images/icon/triangle-alert__fill.svg`;

const props = withDefaults(defineProps<NotiInstanceOptions>(), {
  time: 3000,
});

const emits = defineEmits<{
  (e: 'close', id: string): void;
}>();

const visible = ref(false);
let timeout: any = null;

function close() {
  visible.value = false;
  setTimeout(() => {
    emits('close', props.id);
  }, 300);
}

onMounted(() => {
  visible.value = true;
  timeout = setTimeout(() => {
    close();
  }, props.time);
});

onBeforeUnmount(() => {
  if (timeout) {
    clearTimeout(timeout);
  }
});
</script>

<template>
  <div class="noti" :class="{ [`is-${props.type}`]: true, visible: visible, hidden: !visible }">
    <img v-if="props.type === 'success'" :src="notiSuccessIcon" alt="성공" class="noti__icon" />
    <img v-if="props.type === 'error'" :src="notiErrorIcon" alt="오류" class="noti__icon" />
    <span class="noti__message">{{ props.message }}</span>
    <!-- FIXME :: 미사용으로 주석처리하였습니다 -->
    <!-- <div v-if="useClose" class="noti__close">
      <button @click="close"></button>
    </div> -->
  </div>
</template>

<style></style>
