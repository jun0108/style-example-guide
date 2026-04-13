<script lang="ts" setup>
import type { ModalInstanceOptions } from './type.modal';

type Props = {
  instance: ModalInstanceOptions;
};

const MODAL_WIDTH: Record<string, string> = {
  xs: 'var(--modal-width-xs)',
  sm: 'var(--modal-width-sm)',
  md: 'var(--modal-width-md)',
  lg: 'var(--modal-width-lg)',
  xl: 'var(--modal-width-xl)',
};

const props = defineProps<Props>();
const emits = defineEmits(['close']);

const visible = ref(false);

const component = computed(() => {
  return defineAsyncComponent(props.instance.component);
});

const modalStyle = computed(() => {
  return {
    width:
      props.instance.options?.width && Object.keys(MODAL_WIDTH).includes(props.instance.options?.width!)
        ? MODAL_WIDTH[props.instance.options?.width]
        : props.instance.options?.width,
    height: props.instance.options?.height,
    maxWidth: props.instance.options?.maxWidth,
    maxHeight: props.instance.options?.maxHeight,
    minWidth: props.instance.options?.minWidth,
    minHeight: props.instance.options?.minHeight,
    isFull: props.instance.options?.isFull,
  };
});

function close() {
  visible.value = false;
  setTimeout(() => {
    emits('close', props.instance.id);
  }, 100);
}

function handleClickBackdrop() {
  if (props.instance.options?.useOutsideClick) {
    close();
  }
}

onMounted(() => {
  visible.value = true;
});
</script>

<template>
  <div class="modal-instance" :class="{'is-full': props.instance.options?.isFull}">
    <transition>
      <div v-if="visible" class="modal-instance__backdrop" @click="handleClickBackdrop"></div>
    </transition>
    <transition name="v-modal-box">
      <div
        v-if="visible"
        class="modal-instance__box"
        :class="{
          'modal-instance__box--xs': props.instance.options?.width === 'xs',
        }"
        :style="modalStyle"
      >
        <component :is="component" v-bind="props.instance.bind" v-on="{ ...props.instance.on, close }" />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.v-modal-box-enter-active,
.v-modal-box-leave-active {
  transition: all 0.5s ease-out allow-discrete;
}

.v-modal-box-enter-from,
.v-modal-box-leave-to {
  opacity: 0;
}

.v-modal-box-enter-to,
.v-modal-box-leave-from {
  opacity: 1;
}
</style>
