<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    name: string;
    src?: string;
    type?: 'ico' | 'img';
    size?: 16 | 20 | 24 | 32;
    color?: string;
    alt?: string;
  }>(),
  {
    type: 'ico',
    size: 16,
    color: 'currentColor',
  },
);

const resolvedSrc = computed(
  () => props.src ?? `${import.meta.env.BASE_URL}images/icon/${props.name}.svg`,
);
</script>

<template>
  <img
    v-if="type === 'img'"
    :src="resolvedSrc"
    class="cm-icon cm-icon--img"
    :alt="alt"
    :aria-hidden="alt ? undefined : 'true'"
    :style="{ '--cm-icon-size': `var(--icon-size-${size})` }"
  />
  <span
    v-else
    class="cm-icon cm-icon--ico"
    role="img"
    :aria-label="alt || undefined"
    :aria-hidden="alt ? undefined : 'true'"
    :style="{
      '--cm-icon-size': `var(--icon-size-${size})`,
      '--cm-icon-src': `url('${resolvedSrc}')`,
      '--cm-icon-color': color,
    }"
  />
</template>
