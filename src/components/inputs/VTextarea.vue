<script lang="ts" setup>
import { inputsEnv } from '@/envs';

interface Props {
  disabled?: boolean;
  readonly?: boolean;
  maxlength?: number | string;
  label?: string;
  desc?: string;
  placeholder?: string;
  showCount?: boolean;
  required?: boolean;
  requiredMsg?: string;
  inputFormat?: string | RegExp;
  format?: string | RegExp;
  formatMsg?: string;
  rows?: number | string;
  cols?: number | string;
  resizable?: boolean;
  dataRequiredMsg?: string;
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false,
  readonly: false,
  showCount: true,
  resizable: false,
});

const emits = defineEmits(['input', 'keyup', 'keyup.enter', 'blur', 'keypress', 'keypress.enter']);
const modelValue = defineModel<string | number | undefined>();

const invalidMsg = ref('');
const inputRef = ref();

const invalid = computed(() => {
  return invalidMsg.value && invalidMsg.value.length > 0;
});

const valueLength = computed(() => {
  const value = (modelValue.value as string) ?? '';
  return value.length || 0;
});

// 입력 검증
function validate(value = modelValue.value): boolean {
  // 필수 입력 검증
  if (props.required && (!value || (value as string).trim().length === 0)) {
    if (!props.requiredMsg || props.requiredMsg.length === 0) {
      console.info('[vTextarea] Require required-msg');
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
      console.info('[vTextarea] Notfound regx', props.format);
      return false;
    }

    if (value && (value as string).length > 0 && !regx.test(value as string)) {
      if (!props.formatMsg || props.formatMsg.length === 0) {
        console.info('[vTextarea] Require format-msg');
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

// keypress 이벤트 핸들러
function handleKeypress(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    emits('keypress.enter', event);
  }
  emits('keypress', event);
}

// keyup 이벤트 핸들러
function handleKeyup(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    emits('keyup.enter', event);
  }
  emits('keyup', event);
}

// blur 이벤트 핸들러
function handleBlur(event: Event): void {
  emits('blur', event);
}

// 포커스
function focus(): void {
  inputRef.value.focus();
}

defineExpose({
  validate,
  focus,
  dataRequiredMsg: props.dataRequiredMsg,
});
</script>

<template>
  <div class="v-textarea" :class="{ 'is-error': invalid }">
    <label v-if="props.label && props.label.length > 0" class="v-textarea__label" :class="{ required: props.required }">
      {{ props.label }}
    </label>
    <div class="v-textarea__input-wrapper">
      <textarea
        ref="inputRef"
        v-model="modelValue"
        class="v-textarea__input"
        :class="{ resizable: props.resizable }"
        :maxlength="props.maxlength"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :placeholder="props.placeholder"
        :rows="props.rows"
        :cols="props.cols"
        spellcheck="false"
        @input="handleInput"
        @keypress="handleKeypress"
        @keyup="handleKeyup"
        @blur="handleBlur"
      ></textarea>
      <div v-if="props.showCount && props.maxlength && props.maxlength.toString().length > 0" class="v-textarea__count">
        <b>{{ valueLength }}</b> / <span>{{ props.maxlength }}</span>
      </div>
    </div>
    <!-- 02.27 pub: desc를 사용하는 부분이 없어 주석처리 했습니다 -->
    <!-- <div v-if="!invalid && props.desc && props.desc.length > 0" class="v-textarea__desc">
      {{ props.desc }}
    </div> -->

    <div v-if="invalid" class="v-textarea__desc">
      {{ invalidMsg }}
    </div>
  </div>
</template>

<style></style>
