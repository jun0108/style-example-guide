<script lang="ts" setup>
const route = useRoute();
const router = useRouter();

const menus = [
  { name: '입력', isGroup: true },
  { name: 'Textfield', path: '/guide/inputs/textfield' },
  { name: 'Selector', path: '/guide/inputs/selector' },
  { name: 'Textarea', path: '/guide/inputs/textarea' },
  { name: 'Datepicker', path: '/guide/inputs/datepicker' },
  { name: 'Dropdown', path: '/guide/inputs/dropdown' },
  { name: '컴포넌트', isGroup: true },
  { name: '버튼', path: '/guide/component/button' },
  { name: '토큰', path: '/guide/component/token' },
  { name: '아이콘', path: '/guide/component/icon' },
  { name: '툴팁', path: '/guide/component/tooltip' },
  { name: 'Toggle', path: '/guide/component/toggle' },
  { name: '트리', path: '/guide/component/tree' },
  { name: '데이터 그리드', path: '/guide/component/grid' },
  { name: '테이블', path: '/guide/component/table' },
  { name: '페이지네이션', path: '/guide/component/pagination' },
  { name: '타이머', path: '/guide/component/timer' },
  { name: '컬러피커', path: '/guide/component/colorpicker' },
  { name: '차트', path: '/guide/component/chart' },
  { name: '탭', path: '/guide/component/tab' },
  { name: '아코디언', path: '/guide/component/accordion' },
  { name: '에디터', path: '/guide/component/editor' },
  { name: 'Swipe Bottom Sheet', path: '/guide/component/swipe-bottom-sheet' },
  { name: 'No Data', path: '/guide/component/no-data' },
  { name: '컴포저블', isGroup: true },
  { name: '입력 검증', path: '/guide/composable/validate' },
  { name: '모달 팝업', path: '/guide/composable/modal' },
  { name: '다이얼로그', path: '/guide/composable/dialog' },
  { name: '토스트 알림', path: '/guide/composable/noti' },
  { name: '연동', isGroup: true },
  { name: 'Http Request', path: '/guide/connection/request' },
  { name: '공통 함수', path: '/guide/connection/com-api' },
  { name: '퍼블', isGroup: true },
  { name: '퍼블 목록', path: '/guide/pub/list' },
  { name: '기타', isGroup: true },
  { name: '반응형', path: '/guide/etc/responsive' },
  { name: '업로드 이미지 및 파일', path: '/guide/etc/image-file' },
];

function go(path: string) {
  router.push(path);
}
</script>

<template>
  <div class="layout-guide">
    <div class="layout-guide__lnb">
      <div class="layout-guide__title" @click="go('/guide')">UI 컴포넌트 가이드</div>
      <div class="layout-guide__nav">
        <ul>
          <li v-for="(menu, index) in menus" :key="`menu-${index}`">
            <div v-if="menu.isGroup" class="group">
              {{ menu.name }}
            </div>
            <a v-else :class="{ active: route.path === menu.path }" @click="go(menu.path!)">
              {{ menu.name }}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="layout-guide__contents">
      <main>
        <Router-View />
      </main>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/guide/index.scss';
</style>
