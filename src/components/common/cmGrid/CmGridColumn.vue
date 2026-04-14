<script lang="ts" setup>
import type { ColumnApi } from '@/types/common/type.grid';

export type GridColumnProps = {
  id?: string;
  useTooltip?: boolean;
  align?: 'left' | 'center' | 'right';
  field: string;
  headerName?: string;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  flex?: number;
  resizable?: boolean;
  sortable?: boolean;
  pinned?: 'left' | 'right';
};

export type GridColumn = GridColumnProps & {
  instance: any;
};

const props = withDefaults(defineProps<GridColumnProps>(), {
  id: () => Math.random().toString(32).substring(7),
});

const columnApi = inject<ColumnApi>('columnApi');

function addColumn() {
  const instance = getCurrentInstance();
  if (instance) {
    columnApi?.add({
      ...props,
      instance,
    });
  }
}

function deleteColumn() {
  columnApi?.delete(props);
}

onMounted(() => {
  addColumn();
});

onBeforeUnmount(() => {
  deleteColumn();
});
</script>

<template></template>

<style></style>
