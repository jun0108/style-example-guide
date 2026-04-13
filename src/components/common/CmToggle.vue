<script lang="ts" setup>
type Props = {
  trueValue?: any;
  falseValue?: any;
  disabled?: boolean;
};
const props = withDefaults(defineProps<Props>(), {
  trueValue: true,
  falseValue: false,
  disabled: false,
});
const emits = defineEmits<{
  (e: 'change'): void;
}>();
const modelValue = defineModel<any>();

function toggle() {
  modelValue.value = modelValue.value === props.trueValue ? props.falseValue : props.trueValue;
  emits('change');
}
</script>

<template>
  <button
    class="cm-toggle"
    :class="{ 'is-active': modelValue === props.trueValue }"
    :disabled="props.disabled"
    @click="toggle"
  >
    <span class="cm-toggle__button"></span>
  </button>
</template>

<style></style>
