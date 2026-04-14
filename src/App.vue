<script setup lang="ts">
import ModalContainer from './composables/modal/ModalContainer.vue';
import DialogContainer from './composables/dialog/DialogContainer.vue';
import NotiContainer from './composables/noti/NotiContainer.vue';
import { useLayoutStore } from './stores/store.layout';
import { useResizeObserver } from '@vueuse/core';
import { layoutEnv } from './envs';

const layoutStore = useLayoutStore();

const layoutRef = useTemplateRef('layoutRef');

watch(
  () => layoutStore.type,
  (type) => {
    document.body.setAttribute('data-device', type === 'mobile' ? 'mo' : 'pc');
  },
  { immediate: true },
);

useResizeObserver(layoutRef, (_entries) => {
  if (_entries[0]) {
    if (_entries[0].contentRect.width < layoutEnv.breakpoint && !layoutStore.isMobile) {
      layoutStore.setLayoutType('mobile');
    } else if (_entries[0].contentRect.width >= layoutEnv.breakpoint && layoutStore.isMobile) {
      layoutStore.setLayoutType('pc');
    }
  }
});
</script>

<template>
  <div ref="layoutRef" :class="layoutStore.type">
    <Router-View />
    <ModalContainer />
    <DialogContainer
      :use-header="false"
      cancel-button-class="g-btn--line g-btn--neutral btn--sm"
      confirm-button-class="g-btn--solid g-btn--neutral btn--sm"
    />
    <NotiContainer />
    <cm-loader />
  </div>
</template>
