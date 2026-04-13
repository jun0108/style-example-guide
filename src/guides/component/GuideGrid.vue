<script lang="ts" setup>
import type { RowNode, SortDirection } from 'ag-grid-community';

const data = ref([
  { id: 1, name: 'Person 1', email: 'p1@email.com', phone: '02-1234-1234' },
  { id: 2, name: 'Person 2', email: 'p2@email.com', phone: '041-9999-9999' },
  { id: 3, name: 'Person 3', email: 'p3@email.com', phone: '02-3333-3333' },
  { id: 4, name: 'Person 4', email: 'p4@email.com', phone: '031-2222-2222' },
  { id: 5, name: 'Person 5', email: 'p5@email.com', phone: '02-6666-6666' },
  { id: 6, name: 'Person 6', email: 'p6@email.com', phone: '042-1111-1111' },
  { id: 7, name: 'Person 7', email: 'p7@email.com', phone: '033-1313-2424' },
  { id: 8, name: 'Person 8', email: 'p8@email.com', phone: '043-1144-2255' },
  { id: 9, name: 'Person 9', email: 'p9@email.com', phone: '053-7777-7777' },
  { id: 10, name: 'Person 10', email: 'p10@email.com', phone: '064-7878-6868' },
]);

function handleChangeSelection(rows: Record<string, any>[]) {
  console.log(rows);
}

function handleClickCell(field: string, data: Record<string, any>) {
  console.log('cell clicked', field, data);
}

function handleClickRow(data: Record<string, any>) {
  console.log('row clicked', data);
}

function handleDbClickRow(data: Record<string, any>) {
  console.log('row dbclicked', data);
}

function handleChangeSort(field: string, sort: SortDirection | undefined) {
  console.log('change sort', field, sort);
}

function isRowSelectable(row: RowNode) {
  return row.data.id > 5;
}

function handleClickCustom(row: Record<string, any>) {
  console.log(row.id);
}
</script>

<template>
  <div>
    <h1>그리드</h1>

    <h2>기본</h2>
    <cm-grid
      :data="data"
      sortable
      resizable
      use-row-selection
      @change-selection="handleChangeSelection"
      @click-cell="handleClickCell"
      @click-row="handleClickRow"
      @dbclick-row="handleDbClickRow"
      @change-sort="handleChangeSort"
    >
      <cm-grid-column field="id" headerName="아이디" :width="100" align="center"></cm-grid-column>
      <cm-grid-column field="name" headerName="이름"></cm-grid-column>
      <cm-grid-column field="email" headerName="이메일"></cm-grid-column>
      <cm-grid-column field="phone" headerName="전화번호">
        <template #default="props">{{ props.data.phone }} </template>
      </cm-grid-column>
    </cm-grid>

    <h2>컬럼 고정</h2>
    <cm-grid :data="data" resizable>
      <cm-grid-column field="id" headerName="아이디" pinned="left" :min-width="100" align="center"></cm-grid-column>
      <cm-grid-column field="name" headerName="이름" pinned="left" :min-width="100"></cm-grid-column>
      <cm-grid-column field="email" headerName="이메일" :min-width="300"></cm-grid-column>
      <cm-grid-column field="phone" headerName="전화번호" :min-width="300"></cm-grid-column>
      <cm-grid-column field="email" headerName="이메일" :min-width="100"></cm-grid-column>
      <cm-grid-column field="phone" headerName="전화번호" :min-width="100"></cm-grid-column>
      <cm-grid-column field="email" headerName="이메일" :min-width="100"></cm-grid-column>
      <cm-grid-column field="phone" headerName="전화번호" :min-width="100"></cm-grid-column>
    </cm-grid>

    <h2>일부 Row 체크박스 비활성화</h2>
    <cm-grid
      :data="data"
      sortable
      use-row-selection
      :is-row-selectable="isRowSelectable"
      @change-selection="handleChangeSelection"
    >
      <cm-grid-column field="id" headerName="아이디" :width="100" align="center"></cm-grid-column>
      <cm-grid-column field="name" headerName="이름"></cm-grid-column>
      <cm-grid-column field="email" headerName="이메일">
        <template #default="props">
          <button
            class="py-[0.35rem] px-4 rounded-sm text-xs bg-[#3b3939] text-white hover:bg-[#5a5858] active:bg-[#1a1919] cursor-pointer"
            @click.stop="handleClickCustom(props.data)"
          >
            {{ props.data.email }}
          </button>
        </template>
      </cm-grid-column>
      <cm-grid-column field="phone" headerName="전화번호">
        <template #default="props">
          {{ props.data.phone }}
        </template>
      </cm-grid-column>
    </cm-grid>

    <h2>커스텀 컴포넌트</h2>
    <cm-grid
      :data="data"
      sortable
      use-row-selection
      @change-selection="handleChangeSelection"
      @click-cell="handleClickCell"
      @click-row="handleClickRow"
      @dbclick-row="handleDbClickRow"
      @change-sort="handleChangeSort"
    >
      <cm-grid-column field="id" headerName="아이디" :width="100" align="center"></cm-grid-column>
      <cm-grid-column field="name" headerName="이름"></cm-grid-column>
      <cm-grid-column field="email" headerName="이메일">
        <template #default="props">
          <button
            class="py-[0.35rem] px-4 rounded-sm text-xs bg-[#3b3939] text-white hover:bg-[#5a5858] active:bg-[#1a1919] cursor-pointer"
            @click.stop="handleClickCustom(props.data)"
          >
            {{ props.data.email }}
          </button>
        </template>
      </cm-grid-column>
      <cm-grid-column field="phone" headerName="전화번호">
        <template #default="props">
          {{ props.data.phone }}
        </template>
      </cm-grid-column>
    </cm-grid>
  </div>
</template>

<style></style>
