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
        <cm-icon name="logo--ixi" type="img" :size="32" alt="ixi 로고" class="header__logo" />
        <!-- FIXME: header__title, button 영역은 로그인한 경우 노출되는 항목 -->
        <div class="header__title">enterprise</div>
        <!-- TODO: admin 페이지 전용 작업시 분리 필요 -->
        <div class="header__chip">Admin</div>
      </div>
      <!-- 사용자 전용 버튼 -->
      <!-- // 사이드바 닫기 버튼 -->
      <!-- <cm-button
        color="neutral"
        type="text"
        size="lg"
        icon-only
        aria-label="사이드바 닫기"
      >
        <cm-icon name="panel-left-close__line" :size="32" />
      </cm-button> -->
      <!-- // 사이드바 열기 버튼 -->
      <!-- <cm-button
        color="neutral"
        type="text"
        size="lg"
        icon-only
        aria-label="사이드바 열기"
      >
        <cm-icon name="panel-left-open__line" :size="32" />
      </cm-button> -->
    </div>

    <!-- 사용자 전용 nav -->
    <!-- <nav class="header__nav">
      <ul>
        // FIXME: is-select 클래스 바인딩으로 현재 메뉴 표시 가능합니다.
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
    </nav> -->
    <div class="header__util">
      <!-- FIXME: 로그인한 경우 노출되는 항목  -->
      <!-- 사용자 전용 버튼 -->
      <!-- <cm-button color="primary" type="line" size="md">
          <template #append>
          <cm-icon name="chevron-right__line" />
        </template>
        관리자 콘솔
      </cm-button> -->
      <!-- 관리자 전용 버튼 -->
      <cm-button color="primary" type="line" size="md">
        <template #append>
          <cm-icon name="chevron-right__line" />
        </template>
        사용자 콘솔
      </cm-button>

      <div class="header__profile" :class="{ 'is-open': isShowUserMenu }" @click="toggleUserMenu">
        <div class="header__profile-icon"></div>
        <span class="header__profile-name"> <em>홍길동</em>님 </span>
      </div>

      <button type="button" class="header__button">
        <span>로그아웃</span>
        <cm-button color="neutral" type="text" size="md" icon-only aria-label="로그아웃">
          <cm-icon name="log-out__line" :size="24" />
        </cm-button>
      </button>

      <!-- FIXME: 로그아웃한 경우 노출되는 항목  -->
      <!-- <button type="button" class="header__button">
        <span>로그인</span>
        <cm-button
          color="neutral"
          type="text"
          size="md"
          icon-only
          aria-label="로그인"
        >
          <cm-icon name="log-out__line" :size="24" />
        </cm-button>
      </button> -->
    </div>
  </header>
</template>

<style></style>
