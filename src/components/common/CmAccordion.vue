<script lang="ts" setup>
const emits = defineEmits<{
  (e: 'change', isActive: boolean): void;
}>();

const isActive = ref(false);

function toggle() {
  isActive.value = !isActive.value;
  emits('change', isActive.value);
}

function open() {
  isActive.value = true;
}

function close() {
  isActive.value = false;
}

defineExpose({
  open,
  close,
});
</script>

<template>
  <div class="cm-accordion" :class="{ 'is-active': isActive }">
    <div class="cm-accordion__header">
      <slot name="checkbox"></slot>
      <div class="cm-accordion__inner" @click="toggle">
        <slot name="header"></slot>
        <div class="cm-accordion__arrow" />
      </div>
    </div>
    <div v-if="isActive" class="cm-accordion__body">
      <slot></slot>
    </div>
  </div>
</template>

<style></style>
