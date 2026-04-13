<script lang="ts" setup>
// FIXME :: 퍼블 추가 컴포넌트
type ButtonVariant =
  | 'primary'
  | 'outline'
  | 'outline-dark'
  | 'outline-primary'
  | 'outline-shadow'
  | 'solid-black'
  | 'solid-gray'
  | 'text';

type ButtonSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type Props = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  full?: boolean;
  round?: boolean;
  radiusSm?: boolean;
  iconOnly?: boolean;
  disabled?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  variant: 'outline',
  size: 'md',
});

const buttonClass = computed(() => [
  'cm-button',
  `cm-button--${props.variant}`,
  `cm-button--${props.size}`,
  {
    'cm-button--full': props.full,
    'cm-button--round': props.round,
    'cm-button--radius-sm': props.radiusSm,
    'cm-button--icon-only': props.iconOnly,
  },
]);
</script>

<template>
  <button type="button" :class="buttonClass" :disabled="disabled">
    <template v-if="iconOnly">
      <slot />
    </template>
    <template v-else>
      <span v-if="$slots.prepend" class="cm-button__icon">
        <slot name="prepend" />
      </span>
      <span v-if="$slots.default" class="cm-button__text">
        <slot />
      </span>
      <span v-if="$slots.append" class="cm-button__icon">
        <slot name="append" />
      </span>
    </template>
  </button>
</template>

<style></style>
