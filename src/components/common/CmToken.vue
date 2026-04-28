<script lang="ts" setup>
import { computed } from 'vue';

type TokenKind = 'chip' | 'tag' | 'badge' | 'badge-dot' | 'badge-count' | 'badge-state';
type TokenColor =
  | 'primary'
  | 'primary-light'
  | 'secondary'
  | 'neutral'
  | 'purple'
  | 'pink'
  | 'blue'
  | 'red'
  | 'green'
  | 'yellow';
type TokenSize = 'md' | 'sm';
type TokenType = 'fill' | 'line';
type TokenState = 'good' | 'bad';

type Props = {
  kind?: TokenKind;
  color?: TokenColor;
  size?: TokenSize;
  type?: TokenType;
  state?: TokenState;
  selected?: boolean;
  removable?: boolean;
  removeLabel?: string;
};

const emit = defineEmits<{
  remove: [];
}>();

const props = withDefaults(defineProps<Props>(), {
  kind: 'chip',
  color: 'primary',
  size: 'md',
  type: 'fill',
  state: 'good',
  selected: false,
  removable: false,
  removeLabel: '태그 삭제',
});

const isBadgeState = computed(() => props.kind === 'badge-state');
const isRemovableTag = computed(() => props.kind === 'tag' && props.removable);
const isTextVisible = computed(() => props.kind !== 'badge-dot' && !isBadgeState.value);
const badgeStateIconName = computed(() => (props.state === 'bad' ? 'circle-alert__fill' : 'circle-check__fill'));

const tokenClass = computed(() => [
  'cm-token',
  `cm-token--${props.kind}`,
  `cm-token--${props.color}`,
  `cm-token--${props.size}`,
  `cm-token--${props.type}`,
  {
    [`is-${props.state}`]: isBadgeState.value,
    'is-selected': props.selected,
    'is-removable': isRemovableTag.value,
  },
]);

const handleRemove = () => {
  emit('remove');
};
</script>

<template>
  <span :class="tokenClass">
    <span v-if="isTextVisible" class="cm-token__text">
      <slot />
    </span>
    <cm-icon v-if="isBadgeState" class="cm-token__state-icon" :name="badgeStateIconName" :size="20" />
    <button
      v-if="isRemovableTag"
      type="button"
      class="cm-token__remove"
      :aria-label="removeLabel"
      @click.stop="handleRemove"
    >
      <cm-icon name="custom-x-small__line" :size="16" />
    </button>
  </span>
</template>
