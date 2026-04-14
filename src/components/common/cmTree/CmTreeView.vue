<script lang="ts" setup>
import type { TreeItem } from '@/types/common/type.tree';

type Props = {
  items: TreeItem[];
};
const { items } = defineProps<Props>();
</script>

<template>
  <ul class="cm-tree__view">
    <li v-for="(item, index) in items" :key="`item-${item.id}-${index}`">
      <cm-tree-drag-node :item-id="item.id">
        <cm-tree-node :item="item"></cm-tree-node>
      </cm-tree-drag-node>
      <div
        v-if="item.children && item.children.length > 0"
        v-show="item.treeStatus.isExpanded"
        class="cm-tree__children"
      >
        <cm-tree-view :items="item.children"> </cm-tree-view>
      </div>
    </li>
  </ul>
</template>

<style></style>
