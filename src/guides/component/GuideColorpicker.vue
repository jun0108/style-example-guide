<script lang="ts" setup>
const color = ref('#ff3300');

const modal = useModal();

function openColorpicker() {
  modal.open({
    component: () => import('@/components/common/CmColorpicker.vue'),
    options: {
      width: 'xs',
    },
    bind: {
      color: color.value,
    },
    on: {
      apply: (_color: string) => {
        color.value = _color;
      },
    },
  });
}
</script>

<template>
  <div>
    <h1>컬러피커</h1>

    <div
      class="w-[50px] h-[50px] border-1 border-gray-300 rounded-sm"
      :style="`background-color: ${color}`"
      @click="openColorpicker"
    ></div>
  </div>
</template>

<style></style>
