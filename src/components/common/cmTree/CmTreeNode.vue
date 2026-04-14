<script lang="ts" setup>
import type { TreeOptions, TreeItem } from '@/types/common/type.tree';
import { useCheckUtil } from './utils/tree.utils.check';

type Props = {
  item: TreeItem;
};

const treeOptions = inject<Ref<TreeOptions>>('treeOptions');
const flatItems = inject<Ref<TreeItem[]>>('flatItems');
const selectedItem = inject<Ref<TreeItem>>('selectedItem');
const checkedItems = inject<Ref<TreeItem[]>>('checkedItems');
const indeterminatedItems = inject<Ref<TreeItem[]>>('indeterminatedItems');
const handleChecked = inject<Function>('handleChecked');
const labelSlot = inject<Function>('labelSlot');
const suffixSlot = inject<Function>('suffixSlot');

const { item } = defineProps<Props>();

const isChecked = computed(() => {
  return !!checkedItems?.value.find((_i) => _i.id === item.id);
});

const isIndeterminated = computed(() => {
  return treeOptions?.value.useIndeterminate && !!indeterminatedItems?.value.find((_i) => _i.id === item.id);
});

function toggleExpand() {
  // eslint-disable-next-line vue/no-mutating-props
  item.treeStatus.isExpanded = !item.treeStatus.isExpanded;
}

function selectItem() {
  if (!treeOptions?.value.selectable) {
    return;
  }
  if (selectedItem) {
    selectedItem.value = item;
  }
}

function handleChangeCheckbox(event: Event) {
  const target = event.target as HTMLInputElement;
  const checkUtil = useCheckUtil();

  checkUtil.setData(flatItems!, checkedItems!, indeterminatedItems!);

  if (target.checked) {
    checkUtil.checkItem(item);
  } else {
    checkUtil.uncheckItem(item);
  }

  if (handleChecked) {
    handleChecked();
  }
}
</script>

<template>
  <div class="cm-tree__node">
    <div
      class="cm-tree__arrow"
      :class="{ hidden: !item.children || item.children.length === 0, expanded: item.treeStatus.isExpanded }"
      @click.stop="toggleExpand"
    ></div>
    <div v-if="treeOptions?.checkable" class="cm-tree__checkbox">
      <input
        type="checkbox"
        :indeterminate="isIndeterminated"
        :checked="isChecked"
        :class="treeOptions?.checkboxClass"
        @click="$event.stopPropagation()"
        @change="handleChangeCheckbox"
      />
    </div>
    <div v-if="treeOptions?.draggable" class="cm-tree__draggable"></div>
    <div
      class="cm-tree__name"
      :class="{ selectable: treeOptions?.selectable, selected: selectedItem?.id === item.id }"
      @click="selectItem"
    >
      <div v-if="labelSlot">
        <!-- slot 함수 호출 결과를 직접 출력 -->
        <component :is="labelSlot?.(item.data)?.[0]" />
      </div>
      <div v-else>{{ item.name }}</div>
    </div>
    <div v-if="suffixSlot" class="cm-tree__suffix" @click.stop>
      <component :is="suffixSlot?.(item.data)?.[0]" />
    </div>
  </div>
</template>

<style></style>
