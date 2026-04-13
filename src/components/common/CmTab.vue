<script lang="ts" setup>
import { useLayoutStore } from '@/stores/store.layout';

type TabType = 'line' | 'basic' | 'segment' | 'text';

type Props = {
  tabs: Tab[];
  type?: TabType;
};

const layoutStore = useLayoutStore();

const props = withDefaults(defineProps<Props>(), {
  tabs: () => {
    return [];
  },
  type: 'basic',
});

const emits = defineEmits<{
  (e: 'change'): void;
}>();

const modelValue = defineModel();

const isCollapsed = ref(false);

// 탭 변경
function changeTab(tab: Tab) {
  modelValue.value = tab.key;
  emits('change');
}

// 버튼 토글
function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value;
}
</script>

<template>
  <div class="cm-tab" :class="[`cm-tab--${props.type}`, { collapsed: layoutStore.isMobile && isCollapsed }]">
    <ul>
      <li v-for="tab in tabs" :key="tab.key" :class="{ active: tab.key === modelValue }">
        <button type="button" @click="changeTab(tab)">
          <span
            v-if="tab.icon"
            class="cm-tab__icon"
            :class="`cm-tab__icon--${tab.icon}`"
            aria-hidden="true"
          />
          {{ tab.name }}
        </button>
      </li>
    </ul>
    <!-- <button v-if="layoutStore.isMobile" class="cm-tab__toggle-btn" @click="toggleCollapse">
      <span class="icon" :class="{ up: isCollapsed }"></span>
    </button> -->
  </div>
</template>

<style></style>
