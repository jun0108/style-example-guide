<script lang="ts" setup>
import { isEmpty } from '@/utils/comUtils';

interface Props {
  label?: string;
  options?: Record<string, any>[];
  valueKey?: string;
  labelKey?: string;
  descKey?: string;
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
  descKey: 'desc',
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

const isSingleOptionBoolean = computed(() => {
  return (
    !!props.options?.length &&
    props.options.length === 1 &&
    props.trueValue !== undefined &&
    props.falseValue !== undefined
  );
});

const singleOption = computed(() => {
  return props.options?.[0];
});

function isChecked(option?: Record<string, any>): boolean {
  if (isSingleOptionBoolean.value) {
    const trueValue = props.trueValue ?? true;
    return modelValue.value === trueValue;
  }

  if (!props.options) {
    const trueValue = props.trueValue ?? true;
    return modelValue.value === trueValue;
  }

  if (Array.isArray(modelValue.value)) {
    return modelValue.value.includes(option?.[props.valueKey]);
  }

  return modelValue.value === option?.[props.valueKey];
}

function getOptionLabel(option?: Record<string, any>): string {
  return option?.[props.labelKey] ?? '';
}

function getOptionDesc(option?: Record<string, any>): string {
  return option?.[props.descKey] ?? '';
}

function hasOptioncontent(option?: Record<string, any>): boolean {
  return getOptionLabel(option).length > 0 || getOptionDesc(option).length > 0;
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
    <div
      v-if="props.label && props.label.length > 0"
      class="v-selector__label"
      :class="{ 'is-required': props.required }"
    >
      {{ props.label }}
    </div>
    <div class="v-selector__input-wrapper">
      <div v-if="!props.options" class="v-selector__input" :class="{ 'is-checked': isChecked() }">
        <label>
          <input
            ref="inputRef"
            v-model="modelValue"
            type="checkbox"
            :true-value="props.trueValue"
            :false-value="props.falseValue"
            :disabled="props.disabled"
            @change="handleChange"
          />
        </label>
      </div>
      <div
        v-else-if="isSingleOptionBoolean"
        class="v-selector__input"
        :class="{ 'is-checked': isChecked(singleOption) }"
      >
        <label>
          <span v-if="hasOptioncontent(singleOption)" class="v-selector__content v-selector__content--stacked">
            <span class="v-selector__content-row">
              <input
                ref="inputRef"
                v-model="modelValue"
                type="checkbox"
                :true-value="props.trueValue"
                :false-value="props.falseValue"
                :disabled="props.disabled"
                @change="handleChange"
              />
              <span v-if="getOptionLabel(singleOption)" class="v-selector__content-label">{{
                getOptionLabel(singleOption)
              }}</span>
            </span>
            <span v-if="getOptionDesc(singleOption)" class="v-selector__content-desc">{{
              getOptionDesc(singleOption)
            }}</span>
          </span>
          <input
            v-else
            ref="inputRef"
            v-model="modelValue"
            type="checkbox"
            :true-value="props.trueValue"
            :false-value="props.falseValue"
            :disabled="props.disabled"
            @change="handleChange"
          />
        </label>
      </div>
      <div
        v-for="(option, index) in options"
        v-else
        :key="`opt-${index}`"
        class="v-selector__input"
        :class="{ 'is-checked': isChecked(option) }"
      >
        <label>
          <span v-if="hasOptioncontent(option)" class="v-selector__content v-selector__content--stacked">
            <span class="v-selector__content-row">
              <input
                ref="inputRef"
                v-model="modelValue"
                type="checkbox"
                :value="option[props.valueKey]"
                :disabled="props.disabled"
                @change="handleChange"
              />
              <span v-if="getOptionLabel(option)" class="v-selector__content-label">{{ getOptionLabel(option) }}</span>
            </span>
            <span v-if="getOptionDesc(option)" class="v-selector__content-desc">{{ getOptionDesc(option) }}</span>
          </span>
          <input
            v-else
            ref="inputRef"
            v-model="modelValue"
            type="checkbox"
            :value="option[props.valueKey]"
            :disabled="props.disabled"
            @change="handleChange"
          />
        </label>
      </div>
    </div>
    <div v-if="!invalid && props.desc && props.desc.length > 0" class="v-selector__desc">{{ props.desc }}</div>
    <div v-if="invalid" class="v-selector__desc">{{ invalidMsg }}</div>
  </div>
</template>
