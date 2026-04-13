<script lang="ts" setup>
import CmToggle from '@/components/common/CmToggle.vue';
import type { DropPosition } from '@/types/common/type.tree';
type MenuItem = {
  menuId: string;
  parentMenuId: string;
  menuNm: string;
  orderBy: number;
  useYn: string;
};

const data = ref<MenuItem[]>([
  { menuId: 'M010000', parentMenuId: 'ROOT', menuNm: '메뉴 1', orderBy: 1, useYn: 'Y' },
  { menuId: 'M010100', parentMenuId: 'M010000', menuNm: '메뉴 1-1', orderBy: 1, useYn: 'Y' },
  { menuId: 'M010101', parentMenuId: 'M010100', menuNm: '메뉴 1-1-1', orderBy: 1, useYn: 'Y' },
  { menuId: 'M010102', parentMenuId: 'M010100', menuNm: '메뉴 1-1-2', orderBy: 2, useYn: 'Y' },
  { menuId: 'M010200', parentMenuId: 'M010000', menuNm: '메뉴 1-2', orderBy: 2, useYn: 'Y' },
  { menuId: 'M010300', parentMenuId: 'M010000', menuNm: '메뉴 1-3', orderBy: 3, useYn: 'Y' },
  { menuId: 'M010301', parentMenuId: 'M010300', menuNm: '메뉴 1-3-1', orderBy: 1, useYn: 'Y' },
  { menuId: 'M020000', parentMenuId: 'ROOT', menuNm: '메뉴 2', orderBy: 2, useYn: 'N' },
  { menuId: 'M020100', parentMenuId: 'M020000', menuNm: '메뉴 2-1', orderBy: 1, useYn: 'N' },
  { menuId: 'M020200', parentMenuId: 'M020000', menuNm: '메뉴 2-2', orderBy: 2, useYn: 'N' },
  { menuId: 'M030000', parentMenuId: 'ROOT', menuNm: '메뉴 3', orderBy: 3, useYn: 'Y' },
  { menuId: 'M030100', parentMenuId: 'M030000', menuNm: '메뉴 3-1 ', orderBy: 1, useYn: 'Y' },
  { menuId: 'M030200', parentMenuId: 'M030000', menuNm: '메뉴 3-2', orderBy: 2, useYn: 'Y' },
]);

const treeRef = ref();
const draggableTreeRef = ref();

function changeData() {
  data.value.push({ menuId: 'M040000', parentMenuId: 'ROOT', menuNm: '메뉴 4', orderBy: 4, useYn: 'Y' });
}

function handleSelect(item: MenuItem) {
  console.log(item);
}

function getChecked() {
  const checkedItems = treeRef.value.getCheckedData();
  console.log(checkedItems);
}

function setCheckedData() {
  treeRef.value.setCheckedData(['M010000', 'M020000', 'M030000']);
}

function clearCheckedData() {
  treeRef.value.clearCheckedData();
}

function getData() {
  const data = draggableTreeRef.value.getData();
  console.log(data);
}

function getChangedData() {
  const data = draggableTreeRef.value.getChangedData();
  console.log(data);
}

function handleErrorDepth(depth: number) {
  console.error('over max depth', depth);
}

function beforeDrop(dragItem: MenuItem, dropItem: MenuItem, dropPosition: DropPosition) {
  if (dropItem.menuId === 'M020000' && dropPosition === 'NODE') {
    console.log('cannot drop');
    return false;
  }
  return true;
}

function handleDraged(items: MenuItem[]) {
  console.log('draged', items);
}
</script>

<template>
  <div>
    <h1>트리</h1>

    <h2>Basic</h2>
    <div>
      <button class="g-btn--line g-btn--sm" @click="changeData">데이터 변경</button>
    </div>
    <div class="mt-3 border-1 border-[#d4d3d3] p-3 rounded-sm">
      <cm-tree
        :data="data"
        id-key="menuId"
        name-key="menuNm"
        parent-id-key="parentMenuId"
        order-by-key="orderBy"
        root-id="ROOT"
        selectable
        @select="handleSelect"
      >
      </cm-tree>
    </div>

    <h2>Checkable</h2>
    <div>
      <button class="g-btn--line g-btn--sm" @click="getChecked">Get checked data</button>
      <button class="ml-2 g-btn--line g-btn--sm" @click="setCheckedData">Set checked data</button>
      <button class="ml-2 g-btn--line g-btn--sm" @click="clearCheckedData">clear checked data</button>
    </div>
    <div class="mt-3 border-1 border-[#d4d3d3] p-3 rounded-sm">
      <cm-tree
        ref="treeRef"
        :data="data"
        id-key="menuId"
        name-key="menuNm"
        parent-id-key="parentMenuId"
        order-by-key="orderBy"
        root-id="ROOT"
        checkable
        checkbox-class="cm-selector"
        use-indeterminate
        include-indeterminate
      ></cm-tree>
    </div>

    <h2>Draggable</h2>
    <div>
      <button class="g-btn--line g-btn--sm" @click="getData">Get data</button>
      <button class="g-btn--line g-btn--sm ml-2" @click="getChangedData">Get changed data</button>
    </div>
    <div class="mt-3 border-1 border-[#d4d3d3] p-3 rounded-sm">
      <cm-tree
        ref="draggableTreeRef"
        :data="data"
        id-key="menuId"
        name-key="menuNm"
        parent-id-key="parentMenuId"
        order-by-key="orderBy"
        root-id="ROOT"
        draggable
        selectable
        :before-drop="beforeDrop"
        type="bordered"
        @error-depth="handleErrorDepth"
        @draged="handleDraged"
      >
        <template #suffix="slotData">
          <CmToggle v-if="slotData && 'useYn' in slotData" v-model="slotData.useYn" true-value="Y" false-value="N" />
        </template>
      </cm-tree>
    </div>

    <h2>Custom Label</h2>
    <div class="border-1 border-[#d4d3d3] p-3 rounded-sm">
      <cm-tree
        :data="data"
        id-key="menuId"
        name-key="menuNm"
        parent-id-key="parentMenuId"
        order-by-key="orderBy"
        root-id="ROOT"
      >
        <template #label="item">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="text-ellipsis whitespace-nowrap overflow-hidden">
                {{ item.menuNm }}
              </div>
              <div
                v-if="item.useYn === 'N'"
                class="ml-2 px-2 py-[0.25rem] rounded-xs text-xs bg-(--color-text-50) text-(--color-white)"
              >
                미사용
              </div>
            </div>
            <button
              class="py-[0.35rem] px-4 rounded-sm text-xs bg-[#3b3939] text-white hover:bg-[#5a5858] active:bg-[#1a1919] cursor-pointer"
              @click="
                () => {
                  console.log(item);
                }
              "
            >
              선택
            </button>
          </div>
        </template>
      </cm-tree>
    </div>
  </div>
</template>

<style></style>
