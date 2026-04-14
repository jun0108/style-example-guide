<script lang="ts" setup>
import type { TreeItem, DropPosition, TreeOptions } from '@/types/common/type.tree';
import { useDragUtil } from './utils/tree.utils.drag';

type Props = {
  id?: string;
  data?: any[];
  idKey: string;
  nameKey: string;
  parentIdKey: string;
  orderByKey?: string;
  depthLevelKey?: string;
  rootId?: string | number;
  checkable?: boolean;
  draggable?: boolean;
  selectable?: boolean;
  useIndeterminate?: boolean;
  includeIndeterminate?: boolean;
  expandAll?: boolean;
  expandIds?: any[];
  expandLevel?: number;
  beforeDrop?: (dragItem: any, dropItem: any, dropPosition: DropPosition) => boolean;
  maxDepth?: number;
  type?: 'bordered';
  checkboxClass?: string;
};

const props = withDefaults(defineProps<Props>(), {
  id: 'cm-tree-' + (Math.random() + 1).toString(32).substring(7),
  data: () => [],
  checkable: false,
  draggable: false,
  selectable: false,
  useIndeterminate: false,
  expandAll: true,
  expandIds: () => [],
});

const emits = defineEmits<{
  (e: 'select', item: any): void;
  (e: 'error-depth', depth: number): void;
  (
    e: 'draged',
    items: any[],
    dragItemId: string | number,
    dropItemId: string | number,
    dropPosition: DropPosition,
  ): void;
  (e: 'check', items: any[]): void;
}>();

const slots = defineSlots();

const treeItems = ref<TreeItem[]>([]);
const flatItems = ref<TreeItem[]>([]);
const treeOptions = ref<TreeOptions>({
  checkable: props.checkable,
  draggable: props.draggable,
  selectable: props.selectable,
  useIndeterminate: props.useIndeterminate,
  checkboxClass: props.checkboxClass,
});
const selectedItem = ref<TreeItem>();
const checkedItems = ref<TreeItem[]>([]);
const indeterminatedItems = ref<TreeItem[]>([]);
const changedItemIds = ref<(string | number)[]>([]);

provide('treeItems', treeItems);
provide('flatItems', flatItems);
provide('treeOptions', treeOptions);
provide('selectedItem', selectedItem);
provide('checkedItems', checkedItems);
provide('indeterminatedItems', indeterminatedItems);
provide('labelSlot', slots.label);
provide('suffixSlot', slots.suffix);
provide('handleDraged', handleDraged);
provide('handleChecked', handleChecked);
provide('id', props.id);

// 트리 아이템 설정
function setItems() {
  treeItems.value = [];
  flatItems.value = [];

  if (!props.data || props.data.length === 0) {
    return;
  }

  treeItems.value = getChildren(props.rootId);
}

// 하위 아이템 가져오기 - recursive
function getChildren(parentId: string | number | undefined, parents: (string | number)[] = []): TreeItem[] {
  const children: TreeItem[] = [];

  let childrenData = [...props.data.filter((_i: any) => _i[props.parentIdKey] === parentId)];
  if (props.orderByKey) {
    childrenData = childrenData.sort((a, b) => a[props.orderByKey!] - b[props.orderByKey!]);
  }

  childrenData.forEach((i, index) => {
    const id = i[props.idKey];
    const item: TreeItem = {
      id,
      name: i[props.nameKey],
      parentId,
      order: index,
      path: [...parents, id],
      data: i,
      children: [],
      treeStatus: {
        isExpanded: props.expandAll,
      },
    };

    item.children = getChildren(id, [...parents, id]);
    children.push(item);
    flatItems.value.push(item);
  });

  return children;
}

function handleChecked() {
  emits('check', getCheckedData());
}

/* ============================== [drag] ========================= */
// 아이템 하위 깊이 조회
function getItemDepth(item: TreeItem) {
  if (!item.children || item.children.length === 0) {
    return 1;
  }
  let maxDepth = 0;
  for (let i = 0; i < item.children.length; i++) {
    const depth = getItemDepth(item.children[0]!);
    maxDepth = Math.max(maxDepth, depth);
  }
  return maxDepth + 1;
}

// 드래그 이벤트 핸들러
async function handleDraged(dragItemId: string | number, dropItemId: string | number, dropPosition: DropPosition) {
  const dragItem = flatItems.value.find((_i) => _i.id === dragItemId);
  const dropItem = flatItems.value.find((_i) => _i.id === dropItemId);

  if (!dragItem || !dropItem) {
    return;
  }

  const dragParentItemId = dragItem.parentId;

  if (dragItemId === dropItemId && dropPosition === 'NODE') {
    return;
  }

  // 최대 depth 확인
  if (props.maxDepth && props.maxDepth > 0) {
    let depth = dropItem.path.length + getItemDepth(dragItem) - 1;
    if (dropPosition === 'NODE') {
      depth += 1;
    }
    if (props.maxDepth < depth) {
      emits('error-depth', depth);
      return;
    }
  }

  if (props.beforeDrop && !props.beforeDrop(dragItem.data, dropItem.data, dropPosition)) {
    return;
  }

  try {
    const dragUtils = useDragUtil();
    dragUtils.setData(flatItems, treeItems, changedItemIds, props.rootId);
    await dragUtils.changePosition(dragItemId, dropItemId, dropPosition);

    nextTick(() => {
      const items = getChangedData();
      emits('draged', items, dragItemId, dropItemId, dropPosition);
    });
  } catch (e) {
    console.error(e);
  }
}

// data 업데이트
function updateItemData(items: TreeItem[]) {
  return items.map((_i) => {
    const data = {
      ..._i.data,
      [props.parentIdKey]: _i.parentId,
    };
    if (props.orderByKey) {
      data[props.orderByKey] = _i.order;
    }
    if (props.depthLevelKey) {
      data[props.depthLevelKey] = _i.path.length;
    }
    return data;
  });
}

/* ============================== [expose] ========================= */
// 트리 데이터 조회
function getTreeData() {
  return flatItems.value.map((_i) => {
    _i.data = {
      ..._i.data,
      [props.parentIdKey]: _i.parentId,
    };
    if (props.orderByKey) {
      _i.data[props.orderByKey] = _i.order;
    }
    if (props.depthLevelKey) {
      _i.data[props.depthLevelKey] = _i.path.length;
    }
    return _i;
  });
}

// 데이터 조회
function getData() {
  return updateItemData(flatItems.value);
}

// 체크 데이터 조회
function getCheckedData() {
  let checked = [];
  if (props.includeIndeterminate) {
    checked = [...checkedItems.value, ...indeterminatedItems.value];
  } else {
    checked = [...checkedItems.value];
  }
  return checked.map((_i) => _i.data);
}

// 체크 아이템 설정
function setCheckedData(ids: (string | number)[]) {
  const items: TreeItem[] = [];

  ids.forEach((_id) => {
    const item = flatItems.value.find((_i) => _i.id === _id);
    if (item) {
      items.push(item);
    }
  });

  checkedItems.value = items;
}

// 체크 데이터 초기화
function clearCheckedData() {
  checkedItems.value = [];
}

// 선택 데이터 조회
function getSelectedData() {
  return selectedItem.value?.data;
}

// 선택 아이템 설정
function setSelectedData(id: string | number) {
  selectedItem.value = flatItems.value.find((_i) => _i.id === id);
}

// 변경 데이터 조회
function getChangedData() {
  const items = getChangedTreeData();
  return updateItemData(items);
}

// 변경된 트리 데이터 조회
function getChangedTreeData() {
  if (!changedItemIds.value) {
    return [];
  }
  const items: TreeItem[] = [];
  changedItemIds.value.forEach((_id) => {
    const item = flatItems.value.find((_i) => _i.id === _id);
    if (item) {
      items.push(item);
    }
  });
  return items;
}

// 변경 데이터 초기화
function clearChangedData() {
  changedItemIds.value = [];
}

// 데이터 변경 감지
watch(
  () => props.data,
  () => {
    setItems();
    // clear data
    selectedItem.value = undefined;
    checkedItems.value = [];
    indeterminatedItems.value = [];
    changedItemIds.value = [];
  },
  {
    immediate: true,
    deep: true,
  },
);

watch(
  () => selectedItem.value,
  () => {
    if (selectedItem.value && selectedItem.value.data) {
      emits('select', selectedItem.value.data);
    }
  },
  {
    deep: true,
  },
);

defineExpose({
  getTreeData,
  getData,
  getCheckedData,
  setCheckedData,
  clearCheckedData,
  getSelectedData,
  setSelectedData,
  getChangedData,
  getChangedTreeData,
  clearChangedData,
});

onMounted(() => {});
</script>

<template>
  <div class="cm-tree" :class="{ bordered: props.type === 'bordered' }">
    <cm-tree-view :items="treeItems"></cm-tree-view>
    <div :id="`ghost-${props.id}`" style="position: fixed; top: 100dvh; left: -100dvw"></div>
  </div>
</template>

<style></style>
