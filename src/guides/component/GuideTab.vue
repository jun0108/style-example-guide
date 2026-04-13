<script lang="ts" setup>
const tabsKo = [
  { name: '텍스트', key: 'tab1' },
  { name: '텍스트', key: 'tab2' },
  { name: '텍스트', key: 'tab3' },
];

const tabsEn = [
  { name: 'text', key: 'tab1' },
  { name: 'text', key: 'tab2' },
  { name: 'text', key: 'tab3' },
];

const activeTabLine = ref('tab1');
const activeTabDefault = ref('tab1');
const activeTabSegment = ref('tab1');
const activeTabText = ref('tab1');

function handleChange() {
  console.log('change tab');
}
</script>

<template>
  <div>
    <h1>탭</h1>

    <h2>Line</h2>
    <div class="flex flex-wrap items-center gap-3">
      <cm-tab v-model="activeTabLine" type="line" :tabs="tabsKo" @change="handleChange" />
    </div>

    <h2>Basic</h2>
    <div class="flex flex-wrap items-center gap-3">
      <cm-tab v-model="activeTabDefault" type="basic" :tabs="tabsKo" @change="handleChange" />
    </div>

    <h2>Segment</h2>
    <div class="flex flex-wrap items-center gap-3">
      <cm-tab v-model="activeTabSegment" type="segment" :tabs="tabsEn" @change="handleChange" />
    </div>

    <h2>Text</h2>
    <div class="flex flex-wrap items-center gap-3">
      <cm-tab v-model="activeTabText" type="text" :tabs="tabsEn" @change="handleChange" />
    </div>
  </div>
</template>

<style></style>
