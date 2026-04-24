<script lang="ts" setup>
  const menuList = ref([
    {
      menuNm: '회원관리',
      iconNm: 'user__line',
      childMenu: [
        {
          menuNm: '회원 목록',
        },
        {
          menuNm: '조직 그룹 관리',
        },
        {
          menuNm: '권한별 메뉴 접근 제어',
        },
      ]
    },
    {
      menuNm: 'Ask Agent 관리',
      iconNm: 'bot-message-square__line',
      childMenu: [
        {
          menuNm: '퀵 메뉴 설정',
        },
        {
          menuNm: '메시지 관리',
        },
        {
          menuNm: '모델 관리',
        },
        {
          menuNm: '피드백 목록',
        },
      ]
    },
    {
      menuNm: 'Knowledge Studio 관리',
      iconNm: 'book-open-check__line',
      childMenu: [
        {
          menuNm: '조직 / 팀 지식 관리',
        },
        {
          menuNm: '조직 용어집 관리_용어/약어',
        },
        {
          menuNm: '조직 용어집 관리_동의어/이의어',
        },
      ]
    },
    {
      menuNm: 'Agent Studio 관리',
      iconNm: 'layers-plus__line',
      childMenu: [
        {
          menuNm: '에이전트 라이브러리 관리',
        },
        {
          menuNm: '어플리케이션 관리',
        },
        {
          menuNm: '어플리케이션 시크릿 관리',
        },
        {
          menuNm: '프롬프트 관리',
        },
        {
          menuNm: 'MCP 관리',
        },
        {
          menuNm: '태그 관리',
        },
      ]
    },
    {
      menuNm: 'AXOps',
      iconNm: 'laptop__line',
      childMenu: [
        {
          menuNm: 'GPU 모니터링',
        },
        {
          menuNm: 'TBD',
        },
      ]
    },
    {
      menuNm: '모니터링',
      iconNm: 'monitor-check__line',
      childMenu: [
        {
          menuNm: '서비스 모니터링',
        },
        {
          menuNm: '인프라 모니터링',
        },
        {
          menuNm: '유해성 탐지',
        },
        {
          menuNm: '알람 설정',
        },
      ]
    },
    {
      menuNm: '사용자 통계',
      iconNm: 'chart__line',
      childMenu: [
        {
          menuNm: '사용자 통계 대시보드',
        },
        {
          menuNm: 'UV 통계',
        },
        {
          menuNm: 'PV 통계',
        },
      ]
    },
    {
      menuNm: '관리자 로그',
      iconNm: 'file-clock__line',
      childMenu: [
        {
          menuNm: '관리자 로그',
        },
      ]
    },
    {
      menuNm: '스페이스 관리',
      iconNm: 'users__line',
      childMenu: [
        {
          menuNm: '스페이스 관리',
        },
      ]
    },
  ])
</script>

<template>
  <!-- FIXME: short 스타일 적용시 is-short 클래스 바인딩 -->
  <aside class="layout__lnb">
    <!-- admin 페이지 전용 ui -->
    <div v-for="menu in menuList" :key="`menu-list-${menu.menuNm}`" class="lnb__list">
      <p class="lnb__list-title">
        <cm-icon :name="menu.iconNm" :size="20" class="is-prepend"/>
        {{menu.menuNm}}
      </p>
      <ul>
        <li v-for="childMenu in menu.childMenu" :key="`menu-list-child-${childMenu.menuNm}`" >
          <!-- FIXME: 메뉴 선택 시 button 태그에 is-select 클래스 바인딩 -->
          <button type="button" class="lnb__list-item">
          <p>{{childMenu.menuNm}}</p>
          </button>
        </li>
      </ul>
    </div>

    <!-- 사용자 페이지 전용 ui -->
    <div class="lnb__list lnb__list--lg">
      <ul>
        <li>
          <button type="button" class="lnb__list-item is-select">
            <cm-icon name="message-circle-plus__line" :size="24" class="is-prepend"/>
            <p>새로운 채팅하기</p>
            <cm-icon name="chevron-right__line" :size="24" class="is-append"/>
          </button>
        </li>
        <li>
          <button type="button" class="lnb__list-item">
            <cm-icon name="search__line" :size="24" class="is-prepend"/>
            <p>채팅 검색</p>
            <cm-icon name="chevron-right__line" :size="24" class="is-append"/>
          </button>
        </li>
      </ul>
    </div>
    <div class="lnb__list lnb__list--child">
      <p class="lnb__list-title">
        <cm-icon name="message-circle-more__fill" :size="16" class="is-prepend"/>
        Chat
      </p>
      <ul>
        <li>
          <button type="button" class="lnb__list-item is-select">
            <p>새로운 채팅을 시작합니다새로운 채팅을 시작합니다</p>
            <cm-button
              color="neutral"
              type="text"
              size="sm"
              icon-only
              aria-label="더보기"
              class="is-append"
            >
              <cm-icon name="ellipsis-vertical__line"/>
            </cm-button>
          </button>
        </li>
        <li>
          <button type="button" class="lnb__list-item">
            <p>Simple Design System</p>
            <cm-button
              color="neutral"
              type="text"
              size="sm"
              icon-only
              aria-label="더보기"
              class="is-append"
            >
              <cm-icon name="ellipsis-vertical__line"/>
            </cm-button>
          </button>
        </li>
      </ul>
    </div>
  </aside>
</template>

<style></style>
