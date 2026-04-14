<script lang="ts" setup>
import type { TreeItem, DropPosition, TreeOptions } from '@/types/common/type.tree';

type Props = {
  itemId: string;
};

const GHOST_ID = 'tree-ghost-id';

const treeOptions = inject<Ref<TreeOptions>>('treeOptions');
const flatItems = inject<Ref<TreeItem[]>>('flatItems');
const handleDraged = inject<Function>('handleDraged');
const treeId = inject<string>('id');

const props = defineProps<Props>();

const dragNodeRef = ref();

/* ============================== [Drag Handler] ============================== */
function handleDragStart(event: DragEvent) {
  const target = event.target as HTMLElement;
  const dataset = target.dataset;
  event.dataTransfer?.setData('text/plain', JSON.stringify(dataset));

  addGhost(event, dataset.itemId!);
}

function handleDragOver(event: DragEvent) {
  addDragOverClass(event);
  event.preventDefault();
}

function handleDragLeave(event: DragEvent) {
  removeDragOverClass(event);
}

function handleDragEnd(event: DragEvent) {
  event.preventDefault();
}

function handleDrop(event: DragEvent) {
  removeGhost();

  const target = getDragItem(event.target as HTMLElement);
  if (!target) {
    return;
  }

  const dragDataString = event.dataTransfer?.getData('text/plain');
  if (!dragDataString) {
    return;
  }

  const dragDataset = JSON.parse(dragDataString);
  if (!dragDataset || !dragDataset.itemId) {
    return;
  }

  const dropDataset = target.dataset;
  const dropPosition = getDropPosition(target);
  if (handleDraged) {
    handleDraged(dragDataset.itemId, dropDataset.itemId, dropPosition);
  }

  removeDragOverClass(event);
  event.preventDefault();
}

/* ============================== [Helper] ============================== */
function addDragOverClass(event: DragEvent) {
  const target = getDragItem(event.target as HTMLElement);
  if (target) {
    const overClass = getDragOverClass(event.offsetY);
    target.classList.remove('dragover-before', 'dragover-node', 'dragover-after');
    target.classList.add(overClass);
  }
}

function removeDragOverClass(event: DragEvent) {
  const target = getDragItem(event.target as HTMLElement);
  if (target) {
    target.classList.remove('dragover-before', 'dragover-node', 'dragover-after');
  }
}

function getDragOverClass(offsetY: number) {
  const dragItemHeight = dragNodeRef.value.offsetHeight || 0;

  let overClass = 'dragover-node';
  const baseOffset = Math.floor(dragItemHeight / 4) < 10 ? Math.floor(dragItemHeight / 4) : 10;
  if (offsetY > -1 && offsetY <= baseOffset) {
    overClass = 'dragover-before';
  } else if (offsetY > dragItemHeight - baseOffset) {
    overClass = 'dragover-after';
  }

  return overClass;
}

function getDragItem(target: HTMLElement) {
  if (target.tagName === 'DIV' && target.classList.contains('cm-tree__drag-node')) {
    return target;
  }

  if (target.parentElement) {
    return getDragItem(target.parentElement);
  }

  return null;
}

function getDropPosition(target: HTMLElement) {
  let position: DropPosition = 'NODE';

  if (target.classList.contains('dragover-before')) {
    position = 'BEFORE';
  } else if (target.classList.contains('dragover-after')) {
    position = 'AFTER';
  }

  return position;
}

function addGhost(event: DragEvent, itemId: string) {
  const name = flatItems?.value.find((_i) => _i.id === itemId)?.name;

  const div = document.createElement('div');
  div.id = GHOST_ID;
  div.innerText = String(name || itemId);
  div.classList.add('cm-tree__drag-ghost');
  document.getElementById(`ghost-${treeId}`)!.appendChild(div);

  if (event.dataTransfer) {
    event.dataTransfer?.setDragImage(div, 0, 0);
    event.dataTransfer.effectAllowed = 'move';
  }
}

function removeGhost() {
  const ghostNode = document.getElementById(GHOST_ID);
  if (ghostNode) {
    document.getElementById(`ghost-${treeId}`)!.removeChild(ghostNode);
  }
}
</script>

<template>
  <div
    ref="dragNodeRef"
    class="cm-tree__drag-node"
    :draggable="treeOptions?.draggable"
    :data-item-id="props.itemId"
    @dragstart.stop="handleDragStart"
    @dragover.stop="handleDragOver"
    @dragleave.stop="handleDragLeave"
    @dragend.stop="handleDragEnd"
    @drop.stop="handleDrop"
  >
    <slot></slot>
  </div>
</template>

<style></style>
