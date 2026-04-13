<script lang="ts" setup>
type TableRow = {
  label: string;
  value: string;
};

defineProps<{
  rows: TableRow[];
}>();
</script>

<template>
  <table class="cm-table">
    <tbody>
      <tr v-for="(row, index) in rows" :key="index" class="cm-table__row">
        <th class="cm-table__th">{{ row.label }}</th>
        <td class="cm-table__td">{{ row.value }}</td>
      </tr>
    </tbody>
  </table>
</template>
