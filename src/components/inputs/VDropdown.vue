<script lang="ts" setup>
import { useLayoutStore } from '@/stores/store.layout';
import { Dropdown, DropdownContent, DropdownTrigger } from 'v-dropdown';

type Props = {
  label?: string;
  options?: Record<string, any>;
  labelKey?: string;
  valueKey?: string;
  placeholder?: string;
  nodata?: string;
  align?: 'left' | 'center' | 'right';
  required?: boolean;
  requiredMsg?: string;
  desc?: string;
  disabled?: boolean;
  dataRequiredMsg?: string;
  beforeChange?: (oldVal: any, newVal: any) => Promise<boolean>;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

const modal = useModal();

const props = withDefaults(defineProps<Props>(), {
  options: () => {
    return [];
  },
  labelKey: 'label',
  valueKey: 'value',
  placeholder: '선택',
  nodata: '선택 항목이 없습니다',
  align: 'left',
  disabled: false,
  size: 'md',
});

const emits = defineEmits<{
  (e: 'change', value: any): void;
  (e: 'open'): void;
  (e: 'opened'): void;
  (e: 'close'): void;
  (e: 'closed'): void;
}>();

const modelValue = defineModel();
const selected = ref();
const invalidMsg = ref('');
const optionWidth = ref('fit-contents');

const elRef = ref();
const dropdownRef = ref();
const optionRefs = ref();

const invalid = computed(() => {
  return invalidMsg.value && invalidMsg.value.length > 0;
});

async function handleClickOption(option: Record<string, any>) {
  dropdownRef.value?.close();
  try {
    if (props.beforeChange && modelValue.value !== option[props.valueKey]) {
      await props.beforeChange(modelValue.value, option[props.valueKey]);
    }

    selected.value = option;
    modelValue.value = option[props.valueKey];
    emits('change', option[props.valueKey]);
  } catch (e: any) {
    console.log('rejected change');
  }
}

function handleVisibleChange(visible: boolean) {
  if (visible) {
    optionWidth.value = elRef.value.offsetWidth + 'px';
  }
}

function handleOpen() {
  emits('open');
}

function handleOpened() {
  if (selected.value) {
    const index = props.options.findIndex(
      (_o: Record<string, any>) => _o[props.valueKey] === selected.value[props.valueKey],
    );
    if (index > -1) {
      optionRefs.value[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }
  emits('opened');
}

function handleClose() {
  emits('close');
}

function handleClosed() {
  emits('closed');
}

function setSelected() {
  selected.value = props.options.find((_o: Record<string, any>) => _o[props.valueKey] === modelValue.value);
}

// 검증
function validate() {
  // 필수 입력 검증
  if (props.required && !selected.value) {
    if (!props.requiredMsg || props.requiredMsg.length === 0) {
      console.info('[vDropdown] Require require-msg');
    }
    invalidMsg.value = props.requiredMsg || '';
    return false;
  }

  invalidMsg.value = '';
  return true;
}

// 포커스
function focus() {
  dropdownRef.value.display();
}

watch(
  () => modelValue.value,
  () => {
    setSelected();
  },
  {
    immediate: true,
  },
);

watch(
  () => props.options,
  () => {
    setSelected();
  },
);

defineExpose({
  validate,
  focus,
  dataRequiredMsg: props.dataRequiredMsg,
});
</script>

<template>
  <div
    ref="elRef"
    class="v-dropdown"
    :class="[`size--${props.size}`, { 'is-error': invalid }]"
  >
    <label v-if="props.label && props.label.length > 0" class="v-dropdown__label" :class="{ required: props.required }">
      {{ props.label }}
    </label>

    <dropdown
      ref="dropdownRef"
      :toggle="true"
      :gap="8"
      :align="props.align"
      :disabled="props.disabled"
      class="flex-1"
      @visible-change="handleVisibleChange"
      @open="handleOpen"
      @opened="handleOpened"
      @close="handleClose"
      @closed="handleClosed"
    >
      <template #trigger>
        <dropdown-trigger>
          <div class="v-dropdown__header" :class="{ placeholder: !(selected && selected[props.labelKey]) }">
            {{ (selected && selected[props.labelKey]) || props.placeholder }}
          </div>
          <template #append>
            <div class="v-dropdown__icon"></div>
          </template>
        </dropdown-trigger>
      </template>
      <dropdown-content>
        <ul
          class="v-dropdown__content"
          :data-size="props.size"
          :style="`width: ${optionWidth};`"
        >
          <li
            v-for="(opt, index) in options"
            ref="optionRefs"
            :key="`option-${index}`"
            :class="{ selected: opt[props.valueKey] === modelValue }"
            @click="handleClickOption(opt)"
          >
            {{ opt[props.labelKey] }}
          </li>
          <li v-if="options.length === 0" class="v-dropdown__nodata">{{ props.nodata }}</li>
        </ul>
      </dropdown-content>
    </dropdown>
    <!-- 02.27 pub: desc를 사용하는 부분이 없어 주석처리 했습니다 -->
    <!-- <div v-if="!invalid && props.desc && props.desc.length > 0" class="v-dropdown__desc">{{ props.desc }}</div> -->
    <div v-if="invalid" class="v-dropdown__desc">{{ invalidMsg }}</div>
  </div>
</template>

<style></style>
