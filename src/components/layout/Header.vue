<script lang="ts" setup>
import { frameworkEnv } from '@/envs';
import { useCustStore } from '@/stores/store.cust';
import { useMenuStore } from '@/stores/store.menu';
import { useUserStore } from '@/stores/store.user';
import { isEmpty } from '@/utils/comUtils';
import { onClickOutside } from '@vueuse/core';

const route = useRoute();
const custStore = useCustStore();
const menuStore = useMenuStore();
const userStore = useUserStore();
const modal = useModal();
const dialog = useDialog();
const image = useImage();

const logoImg = ref();

const focusedCustMenuSeq = ref<string>('');

const isShowUserMenu = ref(false);
const isShowAllMenu = ref(false);

const userMenuRef = ref();
const menu1DepthRef = ref();
const menu1DepthItemRefs = ref();
const menu2DepthRef = ref();

const childMenus = computed(() => {
  return menuStore.getChildren(focusedCustMenuSeq.value);
});

const focusedMenuIndex = computed(() => {
  return menuStore.firstLevelMenus.findIndex((_m) => _m.custMenuSeq === focusedCustMenuSeq.value);
});

const userName = computed(() => {
  return userStore.usrNm.length > 8 ? userStore.usrNm.substring(0, 8) + '...' : userStore.usrNm;
});

onClickOutside(userMenuRef, () => {
  isShowUserMenu.value = false;
});

// 첫 메뉴 이동
function goFirstMenu() {
  if (!menuStore.firstLevelMenus[0]) {
    throw 'No menus';
  }
  const children = menuStore.getChildren(menuStore.firstLevelMenus[0].custMenuSeq);
  if (!children[0] || isEmpty(children[0].progUri)) {
    throw 'No menus';
  }

  go(children[0].progUri!);
}

// 1레벨 메뉴 활성화 여부
function isActiveFirstLevelMenu(menu: AuthMenu) {
  const custUrl = '/' + custStore.custWebUrl;
  const active = menuStore.menuList.find(
    (_m) => _m.progUri === route.fullPath.substring(route.fullPath.indexOf(custUrl) + custUrl.length),
  );
  return menu.custMenuSeq === active?.upCustMenuSeq;
}

// 2레벨 메뉴 활성화 여부
function isActiveChildMenu(menu: AuthMenu) {
  const custUrl = '/' + custStore.custWebUrl;
  const active = childMenus.value.find(
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
}

// 사용자 메뉴 토글
function toggleUserMenu() {
  isShowUserMenu.value = !isShowUserMenu.value;
  if (isShowUserMenu.value) {
    isShowAllMenu.value = false;
  }
}

// 내 정보 팝업
function openAuthUserPopup() {
  isShowUserMenu.value = false;

  modal.open({
    component: () => import('@/pages/com/popup/AuthUserPopup.vue'),
    options: {
      width: 'md',
    },
    bind: {},
    on: {},
  });
}

// 개인정보 처리방침
function openPrivacyTerms() {
  isShowUserMenu.value = false;
  window.open(import.meta.env.VITE_PRIVACY_URL, '_blank');
}

// 로그아웃
function logout() {
  isShowUserMenu.value = false;
  dialog.confirm('로그아웃하시겠습니까?').then(async () => {
    try {
      await request.post<RequestResponse>({
        url: '/auth/logout',
        xMid: 'P20000',
        data: {},
      });
    } catch (e) {
      console.error(e);
    } finally {
      userStore.logout();
    }
  });
}

// 전체 메뉴
function toggleAllMenu() {
  isShowAllMenu.value = !isShowAllMenu.value;
}

// 하위 메뉴 위치 설정
function set2DepthhMenuPosition() {
  let position = 0;

  // 포커스된 상위 메뉴 위치
  const menu1DepthLeft = menu1DepthRef.value.offsetLeft;
  const menu1DepthRight = menu1DepthRef.value.offsetLeft + menu1DepthRef.value.offsetWidth;
  const focusedMenuRef = menu1DepthItemRefs.value[focusedMenuIndex.value];
  const focusedMenuCenter = focusedMenuRef.offsetLeft + focusedMenuRef.offsetWidth / 2;
  const menu2DepthLeft = focusedMenuCenter - menu2DepthRef.value.offsetWidth / 2;
  const menu2DepthRight = menu2DepthLeft + menu2DepthRef.value.offsetWidth;

  // 상위 메뉴 위치와 중앙을 맞췄을 때 왼쪽, 오른쪽 비교
  if (menu1DepthRight < menu2DepthRight) {
    position = menu1DepthRight - menu2DepthRef.value.offsetWidth;
  } else if (menu1DepthLeft > menu2DepthLeft) {
    position = menu1DepthLeft;
  } else {
    position = menu2DepthLeft;
  }

  menu2DepthRef.value.style.marginLeft = position + 'px';
}

watch(
  () => focusedMenuIndex.value,
  () => {
    nextTick(() => {
      if (focusedMenuIndex.value > -1) {
        set2DepthhMenuPosition();
      }
    });
  },
);

onMounted(async () => {
  if (isEmpty(custStore.logoUrl)) {
    logoImg.value = null;
  } else {
    logoImg.value = await image.fetchPublicImageAsUrl(custStore.logoUrl!);
  }
});

onUnmounted(() => {
  image.releaseImageUrl(logoImg.value);
});
</script>

<template>
  <header class="layout__header" @mouseleave="focusedCustMenuSeq = ''">
    <div class="header--main">
      <div class="overflow-hidden flex items-center">
        <div v-if="logoImg" class="header__logo">
          <img :src="logoImg" />
        </div>
        <div class="header__title" @click="goFirstMenu">
          {{ custStore.custSiteNm || frameworkEnv.title }}
        </div>
      </div>
      <nav v-if="!isShowAllMenu" class="header__nav">
        <ul ref="menu1DepthRef">
          <li
            v-for="menu in menuStore.firstLevelMenus"
            ref="menu1DepthItemRefs"
            :key="`menu-${menu.custMenuSeq}`"
            :class="{ 'is-active': isActiveFirstLevelMenu(menu) }"
            @mouseover="focusedCustMenuSeq = menu.custMenuSeq"
          >
            {{ menu.menuNm }}
          </li>
        </ul>
      </nav>
      <div class="flex items-center">
        <div ref="userMenuRef" class="header__dropdown">
          <!-- FIXME: dropdown__input에 아래와 같이 클래스 바인딩이 필요합니다.
            - is-focus: 드롭다운 메뉴가 포커스된 상태 
          -->
          <div class="dropdown__input" :class="{ 'is-open': isShowUserMenu }" @click="toggleUserMenu">
            <div class="user-profile"></div>
            <div class="dropdown__text" :title="userName">
              {{ userName }}
            </div>
            <div class="dropdown__arrow" />
          </div>
          <ul v-if="isShowUserMenu" class="dropdown__menu">
            <li @click="openAuthUserPopup">내 정보</li>
            <li @click="openPrivacyTerms">개인정보 처리방침</li>
            <li @click="logout">로그아웃</li>
          </ul>
        </div>

        <button type="button" class="header__btn" :class="{ 'is-open': isShowAllMenu }" @click="toggleAllMenu" />
      </div>
    </div>
    <div v-if="!isEmpty(focusedCustMenuSeq)" class="header--child" style="justify-content: flex-start">
      <ul ref="menu2DepthRef" style="max-width: unset; width: fit-content">
        <li
          v-for="menu in childMenus"
          :key="`menu-${menu.custMenuSeq}`"
          :class="{ 'is-active': isActiveChildMenu(menu) }"
          style="width: max-content"
          @click="goMenu(menu)"
        >
          {{ menu.menuNm }}
        </li>
      </ul>
    </div>

    <AllMenuPopup v-if="isShowAllMenu" @close="isShowAllMenu = false" />
  </header>
</template>

<style></style>
