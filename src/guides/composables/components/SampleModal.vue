<script lang="ts" setup>
type Props = {
  bindKey?: string | number;
};
const props = defineProps<Props>();
const emits = defineEmits<{
  (e: 'refresh'): void;
  (e: 'close'): void;
}>();

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

  <div class="modal-instance__sub-header">
    <p>서비스 이용을 위해 약관 동의를 진행해주세요.</p>
    전체동의시 선택동의를 포함하여 모두 동의되며, 선택동의를 하지 않더라도 서비스 가입은 가능합니다.
  </div>

  <div class="modal-instance__divider"></div>

  <div class="modal-instance__body">
    <div v-if="props.bindKey" class="mb-4">
      {{ props.bindKey }}
    </div>
    Body
  </div>

  <div class="modal-instance__footer">
    <CmButton variant="outline" size="lg" full @click="close">취소</CmButton>
    <CmButton variant="primary" size="lg" full @click="apply">적용</CmButton>
  </div>
</template>
