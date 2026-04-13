<script lang="ts" setup>
import NotiInstance from './NotiInstance.vue';
import type { NotiGlobalOptions, NotiInstanceOptions, NotiOptions, NotiType } from './type.noti';

declare global {
  interface Window {
    $noti?: NotiApi;
  }
}

const globalOptions = withDefaults(defineProps<NotiGlobalOptions>(), {
  position: 'bottom-center',
  time: 3000,
});

const instances = ref<NotiInstanceOptions[]>([]);

function createNoti(type: NotiType, message: string, options: NotiOptions) {
  const id = 'noti-' + new Date().getTime() + (Math.random() + 1).toString(32).substring(7);

  const instance = {
    type,
    id,
    message,
    ...globalOptions,
    ...options,
  };
  instances.value.push(instance);
}

function removeNoti(id: string) {
  instances.value = instances.value.filter((i) => i.id != id);
}

function registContainerApi() {
  window.$noti = {
    show: (message: string, options: NotiOptions = {}) => {
      createNoti('default', message, options);
    },
    success: (message: string, options: NotiOptions = {}) => {
      createNoti('success', message, options);
    },
    warning: (message: string, options: NotiOptions = {}) => {
      createNoti('warning', message, options);
    },
    error: (message: string, options: NotiOptions = {}) => {
      createNoti('error', message, options);
    },
  };
}

function unregistContainerApi() {
  delete window.$noti;
}

onMounted(() => {
  registContainerApi();
});

onBeforeUnmount(() => {
  unregistContainerApi();
});
</script>

<template>
  <div class="noti-container" :class="{ [globalOptions.position]: true }">
    <NotiInstance v-for="instance in instances" :key="`noti-${instance.id}`" v-bind="instance" @close="removeNoti" />
  </div>
</template>

<style></style>
