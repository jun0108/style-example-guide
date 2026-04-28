<script lang="ts" setup>
import { useMenuStore } from '@/stores/store.menu';
import { useLayoutStore } from '@/stores/store.layout';

const route = useRoute();
const menuStore = useMenuStore();

const props = defineProps<{
  title?: string;
}>();

const pageTitle = ref<string | undefined>();

const slots = useSlots();

const hasTitleBar = computed(() => props.title || !!slots.titleUtil);


onMounted(() => {
  const path = extractRoutePath(route.path);
  const menu = menuStore.menuList.find((_m) => _m.progUri === path);
  pageTitle.value = menu?.menuNm;
});
</script>

<template>
  <div class="page-layout">
    <div class="page-layout__inner">
      <slot name="breadcrumb" />
      <div v-if="hasTitleBar" class="page-layout__title">
        <h1 class="page-layout__title-text">
          {{ pageTitle || title }}
        </h1>
        <div v-if="$slots.titleUtil" class="page-layout__title-util">
          <slot name="titleUtil" />
        </div>
      </div>

      <div class="page-layout__box">
        <div class="page-layout__content">
          <slot name="content" />
        </div>
      </div>

      <!-- footer 공통 -->
      <footer v-if="$slots.footer" class="page-layout__footer">
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
