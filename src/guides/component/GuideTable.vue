<script lang="ts" setup>
const tableData = ref([
  { label: 'WAN IP', value: 'text' },
  { label: 'LAN IP', value: 'text' },
  { label: 'CTN', value: 'text' },
  { label: 'MAC', value: 'text' },
  { label: 'IMEI', value: 'text' },
  { label: 'APN', value: 'text' },
  { label: 'BAND', value: 'text' },
  { label: '신호대 잡음비(SINR)', value: 'text' },
]);
</script>

<template>
  <div>
    <h1>테이블</h1>
    <cm-table :rows="tableData" />
  </div>
</template>
