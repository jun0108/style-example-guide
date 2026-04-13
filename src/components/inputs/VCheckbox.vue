<script lang="ts" setup>
import { isEmpty } from '@/utils/comUtils';

interface Props {
  label?: string;
  options?: Record<string, any>[];
  valueKey?: string;
  labelKey?: string;
  trueValue?: any;
  falseValue?: any;
  disabled?: boolean;
  required?: boolean;
  requiredMsg?: string;
  desc?: string;
  dataRequiredMsg?: string;
}

const props = withDefaults(defineProps<Props>(), {
  labelKey: 'label',
  valueKey: 'value',
  disabled: false,
  required: false,
});
const emits = defineEmits(['change']);
const modelValue = defineModel({
  default: () => [],
});

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
      console.info('[vCheckbox] Require required-msg');
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
  <div class="v-selector" :class="{ 'is-error': invalid, 'is-disabled': props.disabled }">
    <div v-if="props.label && props.label.length > 0" class="v-selector__label" :class="{ required: props.required }">
      {{ props.label }}
    </div>
    <div class="v-selector__input-wrapper">
      <!-- single -->
      <div v-if="!props.options" class="v-selector__input">
        <label>
          <input
            v-model="modelValue"
            type="checkbox"
            :true-value="props.trueValue"
            :false-value="props.falseValue"
            :disabled="props.disabled"
            @change="handleChange"
          />
        </label>
      </div>
      <!-- multi -->
      <div v-for="(option, index) in options" v-else :key="`opt-${index}`" class="v-selector__input">
        <label>
          <input
            ref="inputRef"
            v-model="modelValue"
            type="checkbox"
            :value="option[props.valueKey]"
            :disabled="props.disabled"
            @change="handleChange"
          />
          <span>{{ option[props.labelKey] }}</span>
        </label>
      </div>
    </div>
    <div v-if="!invalid && props.desc && props.desc.length > 0" class="v-selector__desc">{{ props.desc }}</div>
    <div v-if="invalid" class="v-selector__desc">{{ invalidMsg }}</div>
  </div>
</template>

<style></style>
