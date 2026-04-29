<script lang="ts" setup>
type BreadcrumbItem = {
  id: string | number;
  name: string;
  path?: string;
};

const props = defineProps<{
  menuList?: BreadcrumbItem[];
}>();

type BreadcrumbDisplayItem =
  | {
      type: 'menu';
      menu: BreadcrumbItem;
      isCurrent: boolean;
    }
  | {
      type: 'ellipsis';
      id: string;
    };

const visibleMenuList = computed<BreadcrumbDisplayItem[]>(() => {
  const menuList = props.menuList ?? [];

  if (menuList.length < 4) {
    return menuList.map((menu, index) => ({
      type: 'menu',
      menu,
      isCurrent: index === menuList.length - 1,
    }));
  }

  const lastIndex = menuList.length - 1;

  return [
    { type: 'menu', menu: menuList[0], isCurrent: false },
    { type: 'ellipsis', id: 'hidden-menu-list' },
    { type: 'menu', menu: menuList[lastIndex - 1], isCurrent: false },
    { type: 'menu', menu: menuList[lastIndex], isCurrent: true },
  ];
});
</script>

<template>
  <nav class="cm-breadcrumb" aria-label="Breadcrumb">
    <ol class="cm-breadcrumb__list">
      <!-- TODO: 해당 아이콘은 관리자에서만 표시 레포 이동 시 분리 필요 -->
      <li>
        <cm-icon name="custom-home__fill" :size="20" alt="home" />
      </li>
      <li
        v-for="item in visibleMenuList"
        :key="item.type === 'menu' ? `breadcrumb-menu-${item.menu.id}` : `breadcrumb-${item.id}`"
        class="cm-breadcrumb__item"
        :class="{ 'is-current': item.type === 'menu' && item.isCurrent }"
      >
        <template v-if="item.type === 'menu'">
          <a :href="item.menu.path">{{ item.menu.name }}</a>
        </template>
        <cm-icon v-else name="ellipsis__line" :size="20" alt="ellipsis" />
      </li>
    </ol>
  </nav>
</template>

<style></style>
