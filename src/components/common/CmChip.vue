<script lang="ts" setup>
type ChipVariant = 'gray' | 'red' | 'green' | 'orange' | 'muted' | 'blue' | 'primary' | 'disabled';
type ChipSize = 'md' | 'sm';

type Props = {
  variant?: ChipVariant;
  size?: ChipSize;
};

const props = withDefaults(defineProps<Props>(), {
  variant: 'gray',
  size: 'md',
});

const chipClass = computed(() => ['cm-chip', `cm-chip--${props.variant}`, `cm-chip--${props.size}`]);
</script>

<template>
  <span :class="chipClass">
    <slot />
  </span>
</template>

<style></style>
