<script lang="ts" setup>
import { useMenuStore } from '@/stores/store.menu';
import { useLayoutStore } from '@/stores/store.layout';

/*
 * - single-box: 흰 박스 1개 (default)
 * - split-box: 좌 1박스 | 우 1박스 또는 우 세로 2박스
 * - multi-box: 세로 박스 2개
 * - grid: 카드 그리드
 * - map: 지도 (콘텐츠 패딩 없음)
 */
export type PageLayoutMode = 'single-box' | 'split-box' | 'multi-box' | 'grid' | 'map' | 'tab';

const route = useRoute();
const menuStore = useMenuStore();

const layoutStore = useLayoutStore();

const props = withDefaults(
  defineProps<{
    mode?: PageLayoutMode;
    showBack?: boolean;
    title: string;
    subTitle?: string;
  }>(),
  { mode: 'single-box', showBack: false, subTitle: '' },
);

const pageTitle = ref<string | undefined>();

const slots = useSlots();
const emit = defineEmits<{ back: [] }>();

const hasTitleBar = computed(() => props.showBack || props.title || props.subTitle || !!slots.titleUtil);

const hasRightStack = computed(() => props.mode === 'split-box' && (!!slots.rightTop || !!slots.rightBottom));

function onBack() {
  emit('back');
}

onMounted(() => {
  const path = extractRoutePath(route.path);
  const menu = menuStore.menuList.find((_m) => _m.progUri === path);
  pageTitle.value = menu?.menuNm;
});
</script>

<template>
  <div class="page-layout" :class="[`page-layout--${mode}`]">
    <div class="page-layout__inner">
      <div v-if="hasTitleBar" class="page-layout__title">
        <div class="page-layout__title-inner">
          <cm-button
            v-if="showBack"
            variant="outline"
            size="md"
            icon-only
            aria-label="뒤로 가기"
            class="page-layout__back"
            :class="layoutStore.isMobile ? 'w-[34px]' : 'w-[48px]'"
            @click="onBack"
          />
          <h1 class="page-layout__title-text">
            {{ pageTitle || title }}
          </h1>
          <p v-if="subTitle" class="page-layout__sub-title">
            {{ subTitle }}
          </p>
        </div>
        <div v-if="$slots.titleUtil" class="page-layout__title-util">
          <slot name="titleUtil" />
        </div>
      </div>

      <!-- 모드별 콘텐츠 -->
      <template v-if="mode === 'single-box'">
        <div v-if="$slots.bottomTab" class="page-layout__bottom-tab">
          <slot name="bottomTab" />
        </div>
        <div class="page-layout__box page-layout__box--full">
          <slot />
          <div v-if="$slots.content" class="page-layout__content">
            <slot name="content" />
          </div>
          <div v-if="$slots.detailContent" class="page-layout__content--detail">
            <slot name="detailContent" />
          </div>
        </div>
      </template>

      <template v-else-if="mode === 'split-box'">
        <div class="page-layout__row">
          <div class="page-layout__box page-layout__box--half">
            <slot name="left" />
          </div>
          <template v-if="hasRightStack">
            <div class="page-layout__right-stack">
              <div v-if="$slots.rightTop" class="page-layout__box">
                <slot name="rightTop" />
              </div>
              <div v-if="$slots.rightBottom" class="page-layout__box">
                <slot name="rightBottom" />
              </div>
            </div>
          </template>
          <div v-else class="page-layout__box page-layout__box--half">
            <slot name="right" />
          </div>
        </div>
      </template>

      <template v-else-if="mode === 'multi-box'">
        <div class="page-layout__stack">
          <div class="page-layout__box">
            <slot name="box1" />
          </div>
          <div class="page-layout__box">
            <slot name="box2" />
          </div>
          <div v-if="$slots.box3" class="page-layout__box">
            <slot name="box3" />
          </div>
        </div>
      </template>

      <template v-else-if="mode === 'grid'">
        <div class="page-layout__grid">
          <slot />
        </div>
      </template>

      <template v-else-if="mode === 'map'">
        <div class="page-layout__map">
          <slot />
        </div>
      </template>

      <template v-else-if="mode === 'tab'">
        <div v-if="$slots.bottomTab" class="page-layout__bottom-tab">
          <slot name="bottomTab" />
        </div>
        <slot />
      </template>

      <!-- footer 공통 -->
      <footer v-if="$slots.footer" class="page-layout__footer">
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
