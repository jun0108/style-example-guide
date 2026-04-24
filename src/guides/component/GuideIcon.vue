<script lang="ts" setup>
const sizeList = [16, 20, 24, 32] as const;

const iconList = [
  'archive__line',
  'arrow-right-left__line',
  'book-open-check__line',
  'bot-message-square__fill',
  'bot-message-square__line',
  'calendar__line',
  'check__line',
  'chevron-down__line',
  'chevron-left__line',
  'chevron-right__line',
  'chevron-up__line',
  'chevrons-left__line',
  'chevrons-right__line',
  'chevrons-up-down__line',
  'circle-alert__fill',
  'circle-alert__line',
  'circle-arrow-left__line',
  'circle-arrow-right__line',
  'circle-check__fill',
  'circle-check__line',
  'circle-question-mark__fill',
  'circle-question-mark__line',
  'circle-user-round__line',
  'circle-x__fill',
  'circle-x__line',
  'cloud-upload__line',
  'component__line',
  'copy__line',
  'custom-ellipsis-small__line',
  'custom-empty__line',
  'custom-home__fill',
  'custom-light__line',
  'custom-save-exit__line',
  'custom-x-large__line',
  'custom-x-small__line',
  'download__line',
  'ellipsis-vertical__line',
  'ellipsis__line',
  'eye-off__line',
  'eye__line',
  'file-chart-column__line',
  'file-input__line',
  'file-output__line',
  'file-pen-line__line',
  'file-clock__line',
  'gamepad-2__line',
  'git-compare-arrows__line',
  'image-plus__line',
  'info__fill',
  'info__line',
  'layers-plus__line',
  'layout-template__line',
  'link-2__line',
  'list-indent-increase__line',
  'list-plus__line',
  'log-in__line',
  'log-out__line',
  'mail__line',
  'message-circle-more__fill',
  'message-circle-more__line',
  'message-circle-plus__line',
  'minus__line',
  'mouse-pointer-click__line',
  'move__line',
  'panel-left-close__line',
  'panel-left-open__line',
  'pencil-line__line',
  'play__line',
  'plus__line',
  'redo-2__line',
  'refresh-cw__line',
  'rotate-cw__line',
  'search__line',
  'send__line',
  'settings-2__line',
  'settings__line',
  'share-2__line',
  'share__line',
  'shield-check__line',
  'sliders-horizontal__line',
  'spline-pointer__line',
  'square-arrow-out-up-right__line',
  'square-pen__line',
  'star__fill',
  'star__line',
  'thumbs-down__fill',
  'thumbs-down__line',
  'thumbs-up__fill',
  'thumbs-up__line',
  'trash-2__line',
  'triangle-alert__fill',
  'triangle-alert__line',
  'undo-2__line',
  'user__fill',
  'user__line',
  'users__line',
  'vector-square__line',
  'laptop__line',
  'monitor-check__line',
  'chart__line',
] as const;
</script>

<template>
  <div class="guide-icon guide-page">
    <h1>Icon</h1>
    <section class="guide-section">
      <h2>규칙</h2>
      <blockquote>
        파일명은 <code>{name}__{variant}.svg</code> 규칙을 사용합니다.<br />
        컴포넌트에서는 확장자를 제외한 전체 파일명을 <code>name</code>으로 전달합니다.
      </blockquote>
      <div class="guide-code">
        <code>&lt;cm-icon name="search__line" :size="20" /&gt;</code>
      </div>
    </section>

    <section class="guide-section">
      <h2>Sizes</h2>
      <blockquote>사용 가능한 공통 사이즈는 16px, 20px, 24px, 32px 입니다.</blockquote>
      <ul class="guide-wrap-list">
        <li v-for="size in sizeList" :key="size" class="guide-card-item">
          <cm-icon name="search__line" :size="size" />
          <span>{{ size }}px</span>
        </li>
      </ul>
    </section>

    <section class="guide-section">
      <h2>Colors</h2>
      <blockquote><code>ico</code> 타입은 <code>color</code> prop으로 색상을 제어합니다.</blockquote>
      <ul class="guide-wrap-list">
        <li class="guide-card-item">
          <cm-icon name="star__fill" :size="24" color="var(--color-icon-on-primary)" />
          <span>var(--color-icon-on-primary)</span>
        </li>
        <li class="guide-card-item">
          <cm-icon name="star__fill" :size="24" color="var(--color-icon-primary)" />
          <span>var(--color-icon-primary)</span>
        </li>
        <li class="guide-card-item">
          <cm-icon name="star__fill" :size="24" color="var(--color-icon-on-secondary)" />
          <span>var(--color-icon-on-secondary)</span>
        </li>
        <li class="guide-card-item">
          <cm-icon name="star__fill" :size="24" color="var(--color-icon-secondary)" />
          <span>var(--color-icon-secondary)</span>
        </li>
        <li class="guide-card-item">
          <cm-icon name="star__fill" :size="24" color="var(--color-icon-on-neutral)" />
          <span>var(--color-icon-on-neutral)</span>
        </li>
        <li class="guide-card-item">
          <cm-icon name="star__fill" :size="24" color="var(--color-icon-blue-gray-1)" />
          <span>var(--color-icon-blue-gray-1)</span>
        </li>
        <li class="guide-card-item">
          <cm-icon name="star__fill" :size="24" color="var(--color-icon-blue-gray-2)" />
          <span>var(--color-icon-blue-gray-2)</span>
        </li>
        <li class="guide-card-item">
          <cm-icon name="star__fill" :size="24" color="var(--color-icon-blue-gray-3)" />
          <span>var(--color-icon-blue-gray-3)</span>
        </li>
        <li class="guide-card-item">
          <cm-icon name="star__fill" :size="24" color="var(--color-icon-blue-gray-4)" />
          <span>var(--color-icon-blue-gray-4)</span>
        </li>
        <li class="guide-card-item">
          <cm-icon name="star__fill" :size="24" color="var(--color-icon-blue-gray-5)" />
          <span>var(--color-icon-blue-gray-5)</span>
        </li>
        <li class="guide-card-item">
          <cm-icon name="star__fill" :size="24" color="var(--color-icon-status-success)" />
          <span>var(--color-icon-status-success)</span>
        </li>
        <li class="guide-card-item">
          <cm-icon name="star__fill" :size="24" color="var(--color-icon-status-warning)" />
          <span>var(--color-icon-status-warning)</span>
        </li>
        <li class="guide-card-item">
          <cm-icon name="star__fill" :size="24" color="var(--color-icon-status-error)" />
          <span>var(--color-icon-status-error)</span>
        </li>
        <li class="guide-card-item">
          <cm-icon name="star__fill" :size="24" color="var(--color-icon-status-info)" />
          <span>var(--color-icon-status-info)</span>
        </li>
      </ul>
    </section>

    <section class="guide-section">
      <h2>Image Type</h2>
      <blockquote>여러가지 컬러가 들어가는 아이콘의 경우에는 <code>img</code> 타입으로 그대로 렌더링합니다.</blockquote>
      <ul class="guide-wrap-list">
        <li class="guide-card-item">
          <cm-icon name="circle-check__fill" type="img" :size="32" alt="성공" />
          <span>작성 예시만 참고. 보여지는 아이콘은 무관합니다.</span>
        </li>
      </ul>
    </section>

    <section class="guide-section">
      <h2>Icon List</h2>
      <ul class="guide-wrap-list">
        <li v-for="iconName in iconList" :key="iconName" class="guide-card-item guide-card-item--column">
          <cm-icon :name="iconName" :size="24" />
          <span>{{ iconName }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>
