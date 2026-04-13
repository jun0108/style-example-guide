<script setup lang="ts">
type Props = {
  bindKey?: string | number;
};
const props = withDefaults(defineProps<Props>(), {
  bindKey: () => Math.random().toString(32),
});
const emits = defineEmits(['refresh', 'close']);

function close() {
  emits('close');
}

function apply() {
  emits('refresh');
  emits('close');
}
</script>

<template>
  <div class="modal-instance__header">모달 타이틀</div>

  <div class="modal-instance__divider"></div>

  <div class="modal-instance__body">
    {{ props.bindKey }}
  </div>

  <div class="modal-instance__footer">
    <CmButton variant="primary" size="lg" @click="apply">확인</CmButton>
  </div>
</template>
