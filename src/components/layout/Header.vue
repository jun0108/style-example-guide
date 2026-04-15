<script lang="ts" setup>
const isShowUserMenu = ref(false);

// 사용자 메뉴 토글
function toggleUserMenu() {
  isShowUserMenu.value = !isShowUserMenu.value;
}


</script>

<template>
  <!-- FIXME: short 스타일 적용시 is-short 클래스 바인딩 -->
  <header class="layout__header">
    <div class="header__left">
      <div class="header__logo">
        <div class="header__icon"/>
        <!-- FIXME: header__title, button 영역은 로그인한 경우 노출되는 항목 -->
        <div class="header__title" >
          enterprise
        </div>
        <!-- TODO: admin 페이지 전용 작업시 분리 필요 -->
        <!-- <div class="header__chip">Admin</div> -->
      </div>
      <!-- TODO: 공통 버튼 스타일 추가되면 수정할 버튼 -->
      <button type="button">
        <cm-icon name="panel-left-close__line" :size="32" color="var(--color-icon-blue-gray-4)" />
      </button>
      <!-- <button type="button">
        <cm-icon name="panel-left-open__line" :size="32" color="var(--color-icon-blue-gray-4)" />
      </button> -->
    </div>
    <nav class="header__nav">
      <ul>
        <!-- FIXME: is-select 클래스 바인딩으로 현재 메뉴 표시 가능합니다. -->
        <li class="is-select">
          Ask Agent
        </li>
        <li>
          Knowledge Studio
        </li>
        <li>
          Agent Studio
        </li>
      </ul>
    </nav>
    <div class="header__util">
      <!-- FIXME: 로그인한 경우 노출되는 항목  -->
      <!-- TODO: 공통 버튼 스타일 추가되면 수정할 버튼 -->
      <button type="button" >관리자 콘솔</button>

      <div class="header__profile" :class="{ 'is-open': isShowUserMenu }" @click="toggleUserMenu">
        <div class="profile__icon"></div>
        <span class="profile__name" >
          홍길동
        </span>
      </div>
      <button type="button" class="header__button">
        <span>로그아웃</span>
        <cm-icon name="log-out__line" :size="24" color="var(--color-icon-blue-gray-4)" />
      </button>

      <!-- FIXME: 로그아웃한 경우 노출되는 항목  -->
      <!-- <button type="button" class="header__button">
        <span>로그인</span>
        <cm-icon name="log-in__line" :size="24" color="var(--color-icon-blue-gray-4)" />
      </button> -->
    </div>
  </header>
</template>

<style></style>
