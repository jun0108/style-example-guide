<script lang="ts" setup>
import DialogInstance from './DialogInstance.vue';
import {
  type DialogGlobalOptions,
  type DialogActionType,
  type DialogContainerApi,
  type DialogInstanceOptions,
  type DialogOptions,
  type DialogType,
} from './type.dialog';

declare global {
  interface Window {
    $dialog?: DialogContainerApi;
  }
}

const globalOptions = withDefaults(defineProps<DialogGlobalOptions>(), {
  useHeader: true,
  cancelButtonText: '취소',
  confirmButtonText: '확인',
  clickToClose: false,
  confirmTitle: '확인',
  alertTitle: '알림',
  cancelButtonVariant: 'outline',
  confirmButtonVariant: 'primary',
});

const instances = ref<DialogInstanceOptions[]>([]);

function createInstance(
  type: DialogType,
  message: string,
  options: DialogOptions,
  resolve: (value: void | PromiseLike<void>) => void,
  reject?: (value: void | PromiseLike<void>) => void,
) {
  const id = 'dialog-' + new Date().getTime();

  const onAction = (action: DialogActionType) => {
    removeInstance(id);
    if (action === 'confirm') {
      resolve();
    } else {
      if (reject) {
        reject();
      }
    }
  };

  const instance = {
    ...globalOptions,
    type,
    id,
    message,
    ...options,
    onAction,
    resolve,
    reject,
  };

  instances.value.push(instance);
}

function removeInstance(id: string) {
  const index = instances.value.findIndex((_i) => _i.id === id);
  if (index > -1) {
    instances.value.splice(index, 1);
  }
}

function removeAll() {
  instances.value = [];
}

function registContainerApi() {
  window.$dialog = {
    create: createInstance,
    remove: removeInstance,
    removeAll: removeAll,
  };
}

function unregistContainerApi() {
  delete window.$dialog;
}

onMounted(() => {
  registContainerApi();
});
onBeforeUnmount(() => {
  unregistContainerApi();
});
</script>

<template>
  <div class="dialog-container">
    <DialogInstance
      v-for="(instance, index) in instances"
      :key="`dialog-${index}`"
      data-item="dialog"
      v-bind="instance"
    />
  </div>
</template>

<style></style>
