<script lang="ts" setup>
import { isEmpty } from '@/utils/comUtils';

interface Props {
  label?: string;
  options?: Record<string, any>[];
  valueKey?: string;
  labelKey?: string;
  disabled?: boolean;
  required?: boolean;
  requiredMsg?: string;
  desc?: string;
  dataRequiredMsg?: string;
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  labelKey: 'label',
  valueKey: 'value',
  disabled: false,
  required: false,
});
const emits = defineEmits(['change']);
const modelValue = defineModel();

const invalidMsg = ref('');
const inputRef = ref();

const invalid = computed(() => {
  return invalidMsg.value && invalidMsg.value.length > 0;
});

// 입력 검증
function validate(): boolean {
  // 필수 입력 검증
  if (props.required && isEmpty(modelValue.value)) {
    if (!props.requiredMsg || props.requiredMsg.length === 0) {
      console.info('[vRadio] Require required-msg');
    }

    invalidMsg.value = props.requiredMsg || '';
    return false;
  }

  invalidMsg.value = '';
  return true;
}

// 변경 이벤트 핸들러
function handleChange() {
  emits('change');
}

// 포커스
function focus() {
  if (inputRef.value && inputRef.value[0]) {
    inputRef.value[0].focus();
  }
}

defineExpose({
  validate,
  focus,
  dataRequiredMsg: props.dataRequiredMsg,
});
</script>

<template>
  <div class="v-selector" :class="{ 'has-error': invalid, 'is-disabled': props.disabled }">
    <div v-if="props.label && props.label.length > 0" class="v-selector__label" :class="{ required: props.required }">
      {{ props.label }}
    </div>
    <div class="v-selector__input-wrapper">
      <div
        v-for="(option, index) in options"
        :key="`opt-${index}`"
        class="v-selector__input"
        :class="{ 'is-checked': modelValue === option[props.valueKey] }"
      >
        <label>
          <input
            ref="inputRef"
            v-model="modelValue"
            type="radio"
            :value="option[props.valueKey]"
            :disabled="props.disabled"
            @change="handleChange"
          />
          <span>{{ option[props.labelKey] }}</span>
          <slot v-if="$slots.icon" name="icon" :option="option"></slot>
        </label>
      </div>
    </div>
    <div v-if="!invalid && props.desc && props.desc.length > 0" class="v-selector__desc">{{ props.desc }}</div>
    <div v-if="invalid" class="v-selector__desc">{{ invalidMsg }}</div>
  </div>
</template>

<style></style>
