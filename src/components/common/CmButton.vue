<script lang="ts" setup>
import { computed } from 'vue';

type ButtonColor = 'primary' | 'secondary' | 'neutral';
type ButtonType = 'fill' | 'line' | 'text' | 'underline';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

type Props = {
  color?: ButtonColor;
  type?: ButtonType;
  size?: ButtonSize;
  full?: boolean;
  disabled?: boolean;
  iconOnly?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  type: 'fill',
  size: 'md',
});

const buttonClass = computed(() => [
  'cm-button',
  `cm-button--${props.color}`,
  `cm-button--${props.type}`,
  `cm-button--${props.size}`,
  {
    'is-icon': props.iconOnly,
    'is-full': props.full,
  },
]);
</script>

<template>
  <button type="button" :class="buttonClass" :disabled="disabled">
    <template v-if="iconOnly">
      <slot />
    </template>

    <template v-else>
      <slot v-if="$slots.prepend" name="prepend" />
      <span v-if="$slots.default" class="cm-button__text">
        <slot />
      </span>
      <slot v-if="$slots.append" name="append" />
    </template>
  </button>
</template>
