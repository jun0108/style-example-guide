<script lang="ts" setup>
interface Props {
  options?: Record<string, any>[];
  labelKey?: string;
  valueKey?: string;
  label?: string;
  desc?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  requiredMsg?: string;
  dataRequiredMsg?: string;
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  disabled: false,
  readonly: false,
  required: false,
  labelKey: 'label',
  valueKey: 'value',
});
const emits = defineEmits(['change', 'blur']);
const modelValue = defineModel();

const invalidMsg = ref('');
const inputRef = ref();

const invalid = computed(() => {
  return invalidMsg.value && invalidMsg.value.length > 0;
});

// 검증
function validate(): boolean {
  // 필수 입력 검증
  const value = modelValue.value;
  if (props.required && !value) {
    if (!props.requiredMsg || props.requiredMsg.length === 0) {
      console.info('[vSelect] Require required-msg');
    }
    invalidMsg.value = props.requiredMsg || '';
    return false;
  }

  invalidMsg.value = '';
  return true;
}

// 선택 값 변경
function handleChange() {
  emits('change');
}

// 포커스
function focus() {
  inputRef.value.focus();
}

defineExpose({
  validate,
  focus,
  dataRequiredMsg: props.dataRequiredMsg,
});
</script>

<template>
  <div class="v-select" :class="{ 'has-error': invalid }">
    <label v-if="props.label && props.label.length > 0" class="v-select__label" :class="{ required: props.required }">
      {{ props.label }}
    </label>
    <div class="v-select__input-wrapper">
      <select
        ref="inputRef"
        v-model="modelValue"
        class="v-select__input"
        :readonly="props.readonly"
        :disabled="props.disabled"
        @change="handleChange"
      >
        <option v-for="(opt, index) in props.options" :key="`opt-${index}`" :value="opt[props.valueKey]">
          {{ opt[props.labelKey] }}
        </option>
      </select>
    </div>
    <div v-if="!invalid && props.desc && props.desc.length > 0" class="v-select__desc">{{ props.desc }}</div>
    <div v-if="invalid" class="v-select__desc">{{ invalidMsg }}</div>
  </div>
</template>

<style></style>
