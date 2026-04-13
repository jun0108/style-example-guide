<script lang="ts" setup>
import { useCustStore } from '@/stores/store.cust';
import { useLayoutStore } from '@/stores/store.layout';
import { useMenuStore } from '@/stores/store.menu';

const route = useRoute();
const layoutStore = useLayoutStore();
const menuStore = useMenuStore();
const custStore = useCustStore();

const emits = defineEmits<{
  (e: 'close'): void;
}>();

// 2레벨 메뉴 활성화 여부
function isActiveChildMenu(menu: AuthMenu) {
  const custUrl = '/' + custStore.custWebUrl;
  const active = menuStore.menuList.find(
    (_m) => _m.progUri === route.fullPath.substring(route.fullPath.indexOf(custUrl) + custUrl.length),
  );
  return menu.custMenuSeq === active?.custMenuSeq;
}

// 메뉴 이동
function goMenu(menu: AuthMenu) {
  if (!menu.progUri) {
    return;
  }
  go(menu.progUri);
  emits('close');
}
</script>

<template>
  <div class="header__all-menu">
    <ul v-if="layoutStore.isPc" class="header__all-menu__inner">
      <!-- 1depth 메뉴 영역 -->
      <li v-for="menu in menuStore.firstLevelMenus" :key="menu.custMenuSeq">
        <p class="menu__title">{{ menu.menuNm }}</p>
        <!-- 2depth 메뉴 영역 -->
        <ul class="menu__list">
          <li
            v-for="child in menuStore.getChildren(menu.custMenuSeq)"
            :key="child.custMenuSeq"
            :class="{ 'is-active': isActiveChildMenu(child) }"
            @click="goMenu(child)"
          >
            {{ child.menuNm }}
          </li>
        </ul>
      </li>
    </ul>
    <div v-if="layoutStore.isMobile" class="header__accordion">
      <div class="header__accordion__divider" />
      <cm-accordion v-for="menu in menuStore.firstLevelMenus" :key="menu.custMenuSeq">
        <template #header><p class="menu__title">{{ menu.menuNm }}</p></template>
        <ul class="menu__list">
          <li v-for="child in menuStore.getChildren(menu.custMenuSeq)" :key="child.custMenuSeq" :class="{ 'is-active': isActiveChildMenu(child) }" @click="goMenu(child)">
            {{ child.menuNm }}
          </li>
        </ul>
      </cm-accordion>
    </div>
  </div>
</template>

<style></style>
