<script lang="ts" setup>
import type { DialogActionType, DialogInstanceOptions } from './type.dialog';

const props = withDefaults(defineProps<DialogInstanceOptions>(), {});
const emits = defineEmits(['action']);

const visible = ref(false);

const title = computed(() => {
  return props.title ?? (props.type === 'confirm' ? props.confirmTitle : props.alertTitle);
});

function transformMessage(message: string) {
  return message.replace(/\\n/g, '\n');
}

function open() {
  visible.value = true;
}

function close(action: DialogActionType) {
  visible.value = false;
  setTimeout(() => {
    emits('action', props.type === 'alert' ? 'confirm' : action);
  }, 100);
}

function handleClickBackdrop() {
  if (props.clickToClose) {
    close('cancel');
  }
}

onMounted(() => {
  open();
});
</script>

<template>
  <div class="dialog-instance">
    <transition>
      <div v-if="visible" class="dialog-instance__backdrop" @click="handleClickBackdrop"></div>
    </transition>
    <transition name="v-dialog-box">
      <div v-if="visible" class="dialog-instance__box">
        <div v-if="props.useHeader" class="dialog-instance__header">
          <div class="dialog-instance__title">{{ title }}</div>
        </div>
        <div class="dialog-instance__body">
          {{ transformMessage(props.message) }}
          <div class="dialog-instance__additional" :class="props.additionalClass">
            {{ props.additionalMsg }}
          </div>
        </div>
        <div class="dialog-instance__footer">
          <CmButton
            v-if="props.type === 'confirm'"
            :variant="props.cancelButtonVariant"
            size="lg"
            full
            @click="close('cancel')"
          >
            {{ props.cancelButtonText }}
          </CmButton>
          <CmButton :variant="props.confirmButtonVariant" size="lg" full @click="close('confirm')">
            {{ props.confirmButtonText }}
          </CmButton>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.v-dialog-box-enter-active,
.v-dialog-box-leave-active {
  transition: all 0.3s;
}

.v-dialog-box-enter-from,
.v-dialog-box-leave-to {
  opacity: 0;
  transform: translate(-50%, 0);
}

.v-dialog-box-enter-to,
.v-dialog-box-leave-from {
  opacity: 1;
  transform: translate(-50%, -50%);
}
</style>
