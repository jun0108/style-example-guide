<script lang="ts" setup>
import { Dropdown, DropdownContent, DropdownTrigger } from 'v-dropdown';

type Props = {
  options?: Record<string, any>[];
  labelKey?: string;
  valueKey?: string;
  placeholder?: string;
};

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  labelKey: 'label',
  valueKey: 'value',
  placeholder: '선택',
});

const emits = defineEmits<{
  (e: 'change'): void;
}>();

const modelValue = defineModel<any>();
const selected = ref();

const dropdownRef = ref();

// 옵션 선택 핸들러
function handleClickOption(option: Record<string, any>) {
  dropdownRef.value.close();
  modelValue.value = option[props.valueKey];
  selected.value = option;

  nextTick(() => {
    emits('change');
  });
}

// 선택 설정
function setSelected() {
  selected.value = props.options.find((_o: Record<string, any>) => _o[props.valueKey] === modelValue.value);
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
</script>

<template>
  <Dropdown ref="dropdownRef" :toggle="true" :gap="8" align="left" class="dev__period-dropdown">
    <template #trigger>
      <DropdownTrigger>
        <span class="dev__period-trigger">
          <span class="dev__period-text">{{ (selected && selected[props.labelKey]) || props.placeholder }}</span>
        </span>
      </DropdownTrigger>
    </template>
    <DropdownContent>
      <ul class="v-dropdown__content dev__period-dropdown-content">
        <li
          v-for="(opt, index) in props.options"
          :key="index"
          :class="{ selected: selected && opt.value === selected[props.valueKey] }"
          @click="handleClickOption(opt)"
        >
          {{ opt[props.labelKey] }}
        </li>
      </ul>
    </DropdownContent>
  </Dropdown>
</template>

<style></style>
