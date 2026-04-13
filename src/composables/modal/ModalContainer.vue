<script lang="ts" setup>
import ModalInstance from './ModalInstance.vue';
import { type ModalGlobalOptions, type ModalApi, type ModalInstanceOptions } from './type.modal';

declare global {
  interface Window {
    $modal?: ModalApi;
  }
}
const globalOptions = defineProps<ModalGlobalOptions>();

const instances = ref<ModalInstanceOptions[]>([]);

function createInstance(modal: Modal) {
  const id = 'modal-' + new Date().getTime() + (Math.random() + 1).toString(32).substring(7);

  const instance = {
    id,
    ...modal,
    options: {
      ...globalOptions,
      ...modal.options,
    },
  };

  instances.value.push(instance);
}

function removeInstance(id: string) {
  const index = instances.value.findIndex((i) => i.id === id);
  if (index > -1) {
    instances.value.splice(index, 1);
  }
}

function removeAll() {
  instances.value = [];
}

function registContainerApi() {
  window.$modal = {
    open: createInstance,
    close: removeInstance,
    closeAll: removeAll,
  };
}

function unregistContainerApi() {
  delete window.$modal;
}

watch(
  () => instances.value.length,
  () => {
    if (instances.value.length === 0) {
      document.body.classList.remove('body-scroll-lock');
    } else {
      document.body.classList.add('body-scroll-lock');
    }
  },
);

onMounted(() => {
  registContainerApi();
});

onBeforeUnmount(() => {
  unregistContainerApi();
});
</script>

<template>
  <div class="modal-container">
    <ModalInstance
      v-for="instance in instances"
      :key="`modal-${instance.id}`"
      data-item="modal"
      :instance="instance"
      @close="
        () => {
          removeInstance(instance.id);
        }
      "
    />
  </div>
</template>

<style>
.body-scroll-lock {
  overflow: hidden;
}
</style>
