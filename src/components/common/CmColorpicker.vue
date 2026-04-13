<script lang="ts" setup>
import { ChromePicker } from 'vue-color';
import 'vue-color/style.css';

type Props = {
  color?: string;
};

const props = defineProps<Props>();

const emits = defineEmits<{
  (e: 'close'): void;
  (e: 'apply', color: string): void;
}>();

const colorValue = ref('#fff');

const pickerRef = ref();

function close() {
  emits('close');
}

function apply() {
  emits('apply', colorValue.value);
  close();
}

function focus() {
  pickerRef.value.scrollIntoView({
    behavior: 'smooth',
  });
}

onMounted(() => {
  colorValue.value = props.color || '#fff';
});

defineExpose({
  focus,
});
</script>

<template>
  <div ref="pickerRef" class="cm-colorpicker">
    <chrome-picker
      v-model="colorValue"
      :disable-alpha="true"
      :formats="['hex', 'rgb', 'hsl']"
      style="width: 100%"
      class="cm-colorpicker__picker"
    />
  </div>
  <div class="cm-colorpicker__actions">
    <cm-button variant="solid-gray" size="xs" class="w-[101px]" @click="close">취소</cm-button>
    <cm-button variant="primary" size="xs" class="w-[101px]" @click="apply">적용</cm-button>
  </div>
</template>

<style></style>
