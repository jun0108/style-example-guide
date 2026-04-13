<script lang="ts" setup>
import { inputsEnv } from '@/envs';
import { useFocusWithin } from '@vueuse/core';

interface Props {
  type?: 'text' | 'password' | 'search';
  disabled?: boolean;
  readonly?: boolean;
  maxlength?: number | string;
  label?: string;
  desc?: string;
  placeholder?: string;
  required?: boolean;
  requiredMsg?: string;
  inputFormat?: string | RegExp;
  format?: string | RegExp;
  formatMsg?: string;
  clearable?: boolean;
  dataRequiredMsg?: string;
  value?: string | number;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false,
  readonly: false,
  clearable: false,
});

const emits = defineEmits(['input', 'keyup.enter', 'keyup', 'blur', 'search', 'clear']);
const modelValue = defineModel<string | number>();

const inputType = ref('text');
const invalidMsg = ref('');
const isExternalInvalid = ref(false);
const validMsg = ref('');

const wrapperRef = ref();
const inputRef = ref();

const invalid = computed(() => {
  return invalidMsg.value && invalidMsg.value.length > 0;
});

const { focused } = useFocusWithin(wrapperRef);

watch(
  () => props.type,
  () => {
    inputType.value = props.type;
  },
  {
    immediate: true,
  },
);

// 인풋 타입 토글
function toggleInputType() {
  if (props.type !== 'password') {
    return;
  }
  inputType.value = inputType.value === 'text' ? 'password' : 'text';
}

// 초기화
function clear() {
  modelValue.value = '';

  nextTick(() => {
    emits('clear');
    emits('input');
  });
}

// 검색
function search() {
  emits('search');
}

// 입력 검증
function validate(value = modelValue.value): boolean {
  if (isExternalInvalid.value) {
    return false;
  }
  // 필수 입력 검증
  if (props.required && (!value || (value as string).trim().length === 0)) {
    if (!props.requiredMsg || props.requiredMsg.length === 0) {
      console.info('[vTextfield] Require required-msg');
    }
    invalidMsg.value = props.requiredMsg || '';
    return false;
  }

  // 포맷 입력 검증
  if (props.format) {
    let regx = null;
    if (typeof props.format === 'string') {
      regx = inputsEnv.validationFormats[props.format];
    } else if ((props.format as object) instanceof RegExp) {
      regx = props.format;
    }

    if (!regx) {
      console.info('[vTextfield] Notfound regx', props.format);
      return false;
    }

    if (value && (value as string).length > 0 && !regx.test(value as string)) {
      if (!props.formatMsg || props.formatMsg.length === 0) {
        console.info('[vTextfield] Require format-msg');
      }

      invalidMsg.value = props.formatMsg || '';
      return false;
    }
  }

  invalidMsg.value = '';
  return true;
}

// 입력 이벤트 핸들러
function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;

  // 입력 제한
  if (props.inputFormat) {
    let regx = null;
    if (typeof props.inputFormat === 'string') {
      regx = inputsEnv.inputFormats[props.inputFormat];
    } else if (props.inputFormat instanceof RegExp) {
      regx = props.inputFormat;
    }

    if (regx) {
      target.value = target.value.replace(regx, '');
    }
  }

  modelValue.value = target.value;
  nextTick(() => {
    emits('input', event);
  });
}

// blur 이벤트 핸들러
function handleBlur(event: Event) {
  emits('blur', event);
}

// keyup 이벤트 핸들러
function handleKeyup(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    emits('keyup.enter', event);
  }
  emits('keyup', event);
}

// 외부에서 검증 실패 메시지 설정
function setInvalidMsg(msg: string) {
  invalidMsg.value = msg;
  isExternalInvalid.value = true;
}

// 외부에서 설정한 검증 실패 메시지 초기화
function clearInvalidMsg() {
  invalidMsg.value = '';
  isExternalInvalid.value = false;
}

// 외부에서 메시지 클래스 설정
function setValidMsg(msg: string) {
  validMsg.value = msg;
}

// 외부에서 메시지 클래스 초기화
function clearValidMsg() {
  validMsg.value = '';
}

// 포커스
function focus() {
  inputRef.value.focus();
}

defineExpose({
  validate,
  setInvalidMsg,
  clearInvalidMsg,
  setValidMsg,
  clearValidMsg,
  focus,
  dataRequiredMsg: props.dataRequiredMsg,
});
</script>

<template>
  <div
    class="v-textfield"
    :class="[
      { 'is-error': invalid },
      {
        'has-value':
          focused && (modelValue ?? props.value ?? '').toString().length > 0 && !props.disabled && !props.readonly,
      },
    ]"
  >
    <label
      v-if="props.label && props.label.length > 0"
      class="v-textfield__label"
      :class="{ required: props.required }"
    >
      {{ props.label }}
    </label>
    <div
      ref="wrapperRef"
      class="v-textfield__input-wrapper"
      :class="[
        {
          'has-icon': props.type === 'password' || props.type === 'search',
          'has-reset-icon':
            focused && (modelValue ?? props.value ?? '').toString().length > 0 && !props.disabled && !props.readonly,
        },
      ]"
    >
      <input
        ref="inputRef"
        :value="modelValue ?? props.value ?? ''"
        :type="inputType"
        class="v-textfield__input"
        :placeholder="props.placeholder"
        :maxlength="props.maxlength"
        :disabled="props.disabled"
        :readonly="props.readonly"
        autocapitalize="off"
        @input="handleInput"
        @blur="handleBlur"
        @keyup="handleKeyup"
      />
      <div class="v-textfield__icons">
        <button
          v-if="props.type === 'password' && !disabled"
          type="button"
          class="v-textfield__button eye"
          :class="{ eye: inputType === 'text', 'eye-off': inputType === 'password' }"
          @click="toggleInputType"
        ></button>
        <button
          v-if="
            focused && (modelValue ?? props.value ?? '').toString().length > 0 && !props.disabled && !props.readonly
          "
          type="button"
          class="v-textfield__button remove"
          @click="clear"
        ></button>
        <button
          v-if="props.type === 'search'"
          type="button"
          class="v-textfield__button search"
          @click="search"
        ></button>
      </div>
    </div>
    <div v-if="!invalid && validMsg.length > 0" class="v-textfield__desc valid">
      {{ validMsg }}
    </div>
    <div v-if="invalid" class="v-textfield__desc">{{ invalidMsg }}</div>
  </div>
</template>

<style></style>
