<script lang="ts" setup>
type BreadcrumbItem = {
  id: string | number;
  name: string;
  path?: string;
};

const props = defineProps<{
  menuList?: BreadcrumbItem[];
}>();
</script>

<template>
<nav class="cm-breadcrumb" aria-label="Breadcrumb">
  <ol class="cm-breadcrumb__list">
    <cm-icon name="custom-home__fill" :size="20"/>
    <!-- 예시 -->
    <li class="cm-breadcrumb__item">
      <a >Depth1 </a>
    </li>
    <!-- FIXME: 메뉴가 4개 이상인 경우 1depth, 마지막 전, 마지막 메뉴만 노출 -->
    <li class="cm-breadcrumb__item">
      <cm-icon name="ellipsis__line" :size="20"/>
    </li>
    <!-- 현재 메뉴인 경우 is-current 클래스 바인딩 -->
    <li class="cm-breadcrumb__item is-current">
      <a >Depth2 </a>
    </li>
    <!-- 예시 -->
  
    <li
      v-for="menu in menuList"
      :key="`breadcrumb-menu-${menu.id}`"
      class="cm-breadcrumb__item"
    >
      <a :href="menu.path" >
        {{ menu.name }}
      </a>
    </li>
  
  </ol>
</nav>
</template>

<style></style>
