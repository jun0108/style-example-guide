<script lang="ts" setup>
import {
  AgColumn,
  AllCommunityModule,
  createGrid,
  ModuleRegistry,
  type CellClickedEvent,
  type ColDef,
  type GridApi,
  type GridOptions,
  type IsRowSelectable,
  type RowClickedEvent,
  type RowDoubleClickedEvent,
  type SelectionChangedEvent,
  type SortChangedEvent,
  type SortDirection,
} from 'ag-grid-community';
import type { GridColumn, GridColumnProps } from './CmGridColumn.vue';

ModuleRegistry.registerModules([AllCommunityModule]);

type Props = {
  data?: Record<string, any>[];
  sortable?: boolean;
  resizable?: boolean;
  fitColumns?: boolean;
  useCustomSort?: boolean;
  useRowSelection?: boolean;
  rowSelectionType?: 'single' | 'mluti';
  isRowSelectable?: IsRowSelectable; // row 선택할 수있는지 여부 함수를 제공
  noData?: string;
};

export interface GridColumnApi {
  add: (column: GridColumn) => void;
  delete: (column: GridColumnProps) => void;
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  sortable: false,
  resizable: false,
  fitColumns: true,
  useCustomSort: false,
  useRowSelection: false,
  rowSelectionType: 'mluti',
  noData: '검색 결과가 없습니다.\n검색 조건을 다시 설정해주세요.',
});

const isNoData = computed(() => props.data.length === 0);

const emits = defineEmits<{
  (e: 'changeSelection', data: Record<string, any>[]): void;
  (e: 'clickCell', field: string, data: Record<string, any>): void;
  (e: 'clickRow', data: Record<string, any>): void;
  (e: 'dbclickRow', data: Record<string, any>): void;
  (e: 'changeSort', field: string, sort: SortDirection | undefined): void;
}>();

const gridOptions = ref<GridOptions>({
  defaultColDef: {
    flex: 1,
    sortable: props.sortable,
    resizable: props.resizable,
    unSortIcon: true,
    lockPinned: true,
    onCellClicked: handleCellClicked,
  },
  headerHeight: 40,
  rowHeight: 56,
  selectionColumnDef: {
    sortable: false,
    resizable: false,
    suppressHeaderMenuButton: false,
    pinned: 'left',
    width: 56,
    minWidth: 56,
    maxWidth: 56,
    flex: 0,
  },
  tooltipShowDelay: 500,
  domLayout: 'autoHeight',
  suppressNoRowsOverlay: true,
  suppressDragLeaveHidesColumns: true,
  onSortChanged: handleSortChanged,
  onFirstDataRendered: () => {},
  onSelectionChanged: handleSelectionChanged,
  onRowClicked: handleRowClicked,
  onRowDoubleClicked: handleRowDoubleClicked,
});

const columns = ref<GridColumn[]>([]);

let gridApi: GridApi | undefined = undefined;

const gridRef = ref();

provide('columnApi', {
  add: addColumn,
  delete: deleteColumn,
});

function addColumn(_c: GridColumn) {
  columns.value.push(_c);
}

function deleteColumn(_c: GridColumn) {
  const index = columns.value.findIndex((_col) => _col.id === _c.id);
  if (index > -1) {
    columns.value.splice(index, 1);
  }
}

function initGrid() {
  const options: GridOptions = {
    ...gridOptions.value,
    rowData: props.data,
    columnDefs: getColumnDefs(),
  };

  if (props.useCustomSort) {
    options.defaultColDef!.comparator = () => {
      return 0;
    };
  }

  if (props.useRowSelection) {
    options.rowSelection = {
      mode: props.rowSelectionType === 'single' ? 'singleRow' : 'multiRow',
      hideDisabledCheckboxes: false,
      isRowSelectable: props.isRowSelectable,
      enableClickSelection: props.rowSelectionType === 'single',
      headerCheckbox: true,
      checkboxes: true,
    };
  }

  gridApi = createGrid(gridRef.value, options);
  nextTick(() => {
    if (props.fitColumns) {
      fitGrid();
    }
  });
}

function getColumnDefs() {
  const columnDefs: ColDef[] = [];

  columns.value.forEach((_c) => {
    const column: ColDef & { id: undefined; instance: undefined; useTooltip: undefined; align: undefined } = {
      ..._c,
      id: undefined,
      instance: undefined,
      useTooltip: undefined,
      align: undefined,
      sortable: props.sortable ? props.sortable : _c.sortable,
      resizable: props.resizable ? props.resizable : _c.resizable,
    };

    if (_c.instance.slots.default) {
      column.cellRenderer = (params: any) => {
        return cellRenaderderWithSlot(params, _c.instance.slots.default);
      };
    }

    if (_c.align) {
      column.cellClass = 'ag-cell-' + _c.align;
    }

    columnDefs.push(column);
  });

  return columnDefs;
}

function cellRenaderderWithSlot(params: any, defualtSlot: any) {
  const container = document.createElement('div');
  const app = createApp({
    render() {
      return h('div', {}, defualtSlot({ data: params.data, field: params.colDef.field }));
    },
  });
  app.mount(container);
  return container;
}

function handleSortChanged(event: SortChangedEvent) {
  if (!event.columns || event.columns.length === 0) {
    return;
  }
  const column = event.columns[event.columns.length - 1] as AgColumn;
  if (column) {
    emits('changeSort', column.colId, column.getSort());
  }
}

function handleSelectionChanged(event: SelectionChangedEvent) {
  emits('changeSelection', event.selectedNodes?.map((_n) => _n.data) || []);
}

function handleCellClicked(event: CellClickedEvent) {
  emits('clickCell', event.colDef.field!, event.data);
  event.event?.preventDefault();
}

function handleRowClicked(event: RowClickedEvent) {
  emits('clickRow', event.data);
  event.event?.preventDefault();
}

function handleRowDoubleClicked(event: RowDoubleClickedEvent) {
  emits('dbclickRow', event.data);
  event.event?.preventDefault();
}

function fitGrid() {
  if (gridApi) {
    gridApi.sizeColumnsToFit();
  }
}

function setGridData() {
  if (gridApi) {
    gridApi.setGridOption('rowData', props.data);
  }
}

function refreshColumn() {
  if (gridApi) {
    gridApi.setGridOption('columnDefs', getColumnDefs());
  }
}

watch(
  () => props.data,
  () => {
    setGridData();
  },
);

watch(
  () => columns.value.length,
  () => {
    if (gridApi) {
      refreshColumn();
    }
  },
);

onMounted(() => {
  nextTick(() => {
    initGrid();
  });

  window.addEventListener('resize', () => {
    if (props.fitColumns) {
      fitGrid();
    }
  });
});

onBeforeUnmount(() => {
  columns.value = [];
  window.removeEventListener('resize', fitGrid);
});

defineExpose({
  refreshColumn,
});
</script>

<template>
  <div ref="gridWrapperRef" class="cm-grid">
    <div ref="gridRef" class="cm-grid__grid ag-theme-alpine" :class="{ nodata: isNoData }"></div>
    <cm-no-data v-if="isNoData" custom>
      {{ props.noData }}
    </cm-no-data>
    <div class="hidden">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
.ag-cell-left {
  text-align: left;
}
.ag-cell-center {
  text-align: center;
}
.ag-cell-right {
  justify-content: flex-end;
  text-align: right;
}

.cm-grid__grid.ag-theme-alpine.nodata .ag-body {
  height: 20px;
}
.cm-grid__grid.ag-theme-alpine.nodata {
  .ag-body-horizontal-scroll-viewport,
  .ag-body-horizontal-scroll {
    display: none;
  }
}
</style>
