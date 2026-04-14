import type { DropPosition, TreeItem } from '@/types/common/type.tree';

export const useDragUtil = () => {
  let flatItems: Ref<TreeItem[]> = ref([]);
  let treeItems: Ref<TreeItem[]> = ref([]);
  let changedItemIds: Ref<(string | number)[]> = ref([]);
  let rootId: number | string | undefined = '';

  /* ============================== [helper] ============================== */
  function getItemByItemId(_id: number | string | undefined) {
    return flatItems.value.find((_i) => _i.id === _id);
  }

  function getChildrenOfParentId(_parentId: number | string | undefined) {
    const parent = flatItems.value.find((_i) => _i.id === _parentId);
    return parent?.children || treeItems.value;
  }

  function validate(dragItem: TreeItem, dropItem: TreeItem) {
    if (dragItem.id === dropItem.id || dropItem.path.join('|%%|').startsWith(`${dragItem.path.join('|%%|')}|%%|`)) {
      return false;
    }
    return true;
  }

  function removeItem(dragItem: TreeItem) {
    const nodes = getChildrenOfParentId(dragItem.parentId);
    const index = nodes.findIndex((_i) => _i.id === dragItem.id);
    if (index > -1) {
      nodes.splice(index, 1);
    } else {
      console.error('cannot remove item', nodes, index);
    }
  }

  function resetOrderOfChildren(parentId: string | number | undefined) {
    const parent = flatItems.value.find((_i) => _i.id === parentId);
    const items = parent?.children || treeItems.value;
    items
      .sort((a, b) => a.order - b.order)
      .forEach((_c, index) => {
        const item = flatItems.value.find((_i) => _i.id === _c.id);
        if (item) {
          if (item.order != index) {
            addChangedItemIds(item.id);
          }
          item.order = index;
        }
      });
  }

  function changeParent(dragItem: TreeItem, dropParentId: string | number | undefined) {
    const dragParentId = dragItem.parentId;
    const dropParent = getItemByItemId(dropParentId);
    if (dropParent) {
      dragItem.parentId = dropParent.id;
      dragItem.path = [...dropParent.path, dragItem.id];
    } else {
      dragItem.parentId = rootId;
      dragItem.path = [dragItem.id];
    }

    if (dragItem.children) {
      dragItem.children.forEach((_i) => {
        changeParent(_i, dragItem.id);
      });
    }

    resetOrderOfChildren(dropParentId);
    resetOrderOfChildren(dragParentId);
  }

  function addItemBefore(dragItem: TreeItem, dropItem: TreeItem) {
    const nodes = getChildrenOfParentId(dropItem.parentId);
    const index = nodes.findIndex((_i) => _i.id === dropItem.id);
    if (index > -1) {
      nodes.splice(index, 0, dragItem);
    }
    dragItem.order = dropItem.order - 0.1;

    changeParent(dragItem, dropItem.parentId);
  }

  function addItemAfter(dragItem: TreeItem, dropItem: TreeItem) {
    const nodes = getChildrenOfParentId(dropItem.parentId);
    const index = nodes.findIndex((_i) => _i.id === dropItem.id);
    if (index > -1) {
      nodes.splice(index + 1, 0, dragItem);
    }
    dragItem.order = dropItem.order + 0.1;

    changeParent(dragItem, dropItem.parentId);
  }

  function addItemToChildren(dragItem: TreeItem, dropItem: TreeItem) {
    const children = dropItem.children || [];
    dragItem.order = Math.max(...children.map((_i) => _i.order)) + 1;
    children.push(dragItem);

    changeParent(dragItem, dropItem.id);
  }

  function addChangedItemIds(id: string | number) {
    if (!changedItemIds.value.includes(id)) {
      changedItemIds.value.push(id);
    }
  }

  /* ============================== [expose] ============================== */
  function setData(
    _flatItems: Ref<TreeItem[]>,
    _treeItems: Ref<TreeItem[]>,
    _changedItemIds: Ref<(string | number)[]>,
    _rootId?: number | string,
  ) {
    flatItems = _flatItems;
    treeItems = _treeItems;
    changedItemIds = _changedItemIds;
    rootId = _rootId;
  }

  function changePosition(dragItemId: number | string, dropItemId: number | string, dropPosition: DropPosition) {
    const dragItem = getItemByItemId(dragItemId);
    const dropItem = getItemByItemId(dropItemId);
    if (!dragItem || !dropItem) {
      throw 'There is no drag item and drop item';
    }

    if (!validate(dragItem, dropItem)) {
      throw 'not validate';
    }

    // 아이템 삭제
    removeItem(dragItem);

    // 포지션 별로 데이터 추가
    if (dropPosition === 'BEFORE') {
      addItemBefore(dragItem, dropItem);
    } else if (dropPosition === 'AFTER') {
      addItemAfter(dragItem, dropItem);
    } else {
      addItemToChildren(dragItem, dropItem);
    }

    addChangedItemIds(dragItem.id);

    return Promise.resolve();
  }

  return {
    setData,
    changePosition,
  };
};
