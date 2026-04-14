import type { TreeItem } from '@/types/common/type.tree';

export const useCheckUtil = () => {
  let flatItems: Ref<TreeItem[]> = ref([]);
  let checkedItems: Ref<TreeItem[]> = ref([]);
  let indeterminatedItems: Ref<TreeItem[]> = ref([]);

  /* ============================== checked item ========================= */
  function addCheckedItem(_item: TreeItem) {
    const checked = checkedItems.value.find((_i) => _i.id === _item.id);
    if (!checked) {
      checkedItems.value.push(_item);
    }
  }

  function removeCheckedItem(_item: TreeItem) {
    const index = checkedItems.value.findIndex((_i) => _i.id === _item.id);
    if (index > -1) {
      checkedItems.value.splice(index, 1);
    }
  }

  /* ============================== indeterminated item ========================= */
  function addIndeterminatedItem(_item: TreeItem) {
    const indeterminated = indeterminatedItems.value.find((_i) => _i.id === _item.id);
    if (!indeterminated) {
      indeterminatedItems.value.push(_item);
    }
  }

  function removeIndeterminatedItem(_item: TreeItem) {
    const index = indeterminatedItems.value.findIndex((_i) => _i.id === _item.id);
    if (index > -1) {
      indeterminatedItems.value.splice(index, 1);
    }
  }

  /* ============================== children ========================= */
  function addChildren(_children: TreeItem[]) {
    _children.forEach((_i) => {
      addCheckedItem(_i);
      if (_i.children) {
        addChildren(_i.children);
      }
    });
  }

  function removeChildren(_children: TreeItem[]) {
    _children.forEach((_i) => {
      removeCheckedItem(_i);
      if (_i.children) {
        removeChildren(_i.children);
      }
    });
  }

  /* ============================== parent ========================= */
  function addParent(_item: TreeItem) {
    const parent = flatItems.value.find((_i) => _i.id === _item.parentId);
    const checkedSiblings = checkedItems.value.filter((_i) => _i.parentId === _item.parentId);

    if (!parent) {
      return;
    }

    if (checkedSiblings.length === parent.children.length) {
      removeIndeterminatedItem(parent);
      addCheckedItem(parent);
    } else {
      addIndeterminatedItem(parent);
    }

    addParent(parent);
  }

  function removeParent(_item: TreeItem) {
    const parent = flatItems.value.find((_i) => _i.id === _item.parentId);
    const checkedSiblings = checkedItems.value.filter((_i) => _i.parentId === _item.parentId);
    const indeterminatedSiblings = indeterminatedItems.value.filter((_i) => _i.parentId === _item.parentId);

    if (!parent) {
      return;
    }

    if (checkedSiblings.length > 0 || indeterminatedSiblings.length > 0) {
      addIndeterminatedItem(parent);
      removeCheckedItem(parent);
    } else {
      removeIndeterminatedItem(parent);
    }
    removeParent(parent);
  }

  /* ============================== expose ========================= */
  function setData(_flatItems: Ref<TreeItem[]>, _checkedItems: Ref<TreeItem[]>, _indeterminatedItems: Ref<TreeItem[]>) {
    flatItems = _flatItems;
    checkedItems = _checkedItems;
    indeterminatedItems = _indeterminatedItems;
  }

  function checkItem(_item: TreeItem) {
    addCheckedItem(_item);
    addParent(_item);

    addChildren(_item.children);
  }

  function uncheckItem(_item: TreeItem) {
    removeCheckedItem(_item);
    removeParent(_item);

    removeChildren(_item.children);
  }

  return {
    setData,
    checkItem,
    uncheckItem,
  };
};
