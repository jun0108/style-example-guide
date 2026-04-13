<script lang="ts" setup>
const variants = [
  { value: 'primary', label: 'Primary' },
  { value: 'outline-primary', label: 'Outline Primary' },
  { value: 'outline', label: 'Outline' },
  { value: 'outline-dark', label: 'Outline Dark' },
  { value: 'outline-shadow', label: 'Outline Shadow' },
  { value: 'solid-black', label: 'Solid Black' },
  { value: 'solid-gray', label: 'Solid Gray' },
  { value: 'text', label: 'Text Only' },
] as const;

const sizes = [
  { value: 'xl', label: 'xl (56px)' },
  { value: 'lg', label: 'lg (48px)' },
  { value: 'md', label: 'md (44px)' },
  { value: 'sm', label: 'sm (40px)' },
  { value: 'xs', label: 'xs (36px)' },
  { value: '2xs', label: '2xs (30px)' },
] as const;
</script>

<template>
  <div>
    <h1>버튼</h1>

    <h2>Variants</h2>
    <blockquote>variant prop으로 버튼 스타일 지정</blockquote>
    <div class="flex flex-wrap items-center gap-3">
      <cm-button v-for="v in variants" :key="v.value" :variant="v.value">
        {{ v.label }}
      </cm-button>
    </div>

    <h2>Sizes</h2>
    <blockquote>
      size prop으로 버튼 크기 지정 <br />
      기본값 = 'md'
    </blockquote>
    <div class="flex flex-wrap items-end gap-3">
      <cm-button v-for="s in sizes" :key="s.value" :size="s.value">
        {{ s.label }}
      </cm-button>
    </div>

    <h2>Full Width</h2>
    <blockquote>full prop으로 버튼 너비 100% 처리</blockquote>
    <cm-button full>확인</cm-button>

    <h2>Fixed Width</h2>
    <blockquote>고정 너비는 유틸리티 클래스로 지정</blockquote>
    <div class="flex flex-wrap items-center gap-3">
      <cm-button variant="primary" size="lg" class="w-[120px]">저장</cm-button>
      <cm-button variant="outline" size="lg" class="w-[260px]">조회</cm-button>
    </div>

    <h2>Icon — Prepend</h2>
    <blockquote>
      #prepend 슬롯으로 아이콘을 텍스트 왼쪽에 배치<br />
      기본 gap 사이즈 별로 적용되어 있으며, 직접 지정 시 인라인 스타일로 지정
    </blockquote>
    <div class="flex flex-wrap items-center gap-3">
      <cm-button>
        <template #prepend>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
            <path d="M10 3a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H4a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1z" />
          </svg>
        </template>
        기본 gap
      </cm-button>
      <cm-button style="--cm-button-gap: 2px">
        <template #prepend>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
            <path d="M10 3a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H4a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1z" />
          </svg>
        </template>
        커스텀 gap
      </cm-button>
    </div>

    <h2>Icon — Append</h2>
    <blockquote>
      #append 슬롯으로 아이콘을 텍스트 오른쪽에 배치<br />
      기본 gap 사이즈 별로 적용되어 있으며, 직접 지정 시 인라인 스타일로 지정
    </blockquote>
    <div class="flex flex-wrap items-center gap-3">
      <cm-button>
        기본 gap
        <template #append>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
            <path d="M10 3a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H4a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1z" />
          </svg>
        </template>
      </cm-button>
      <cm-button style="--cm-button-gap: 2px">
        커스텀 gap
        <template #append>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
            <path d="M10 3a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H4a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1z" />
          </svg>
        </template>
      </cm-button>
    </div>

    <h2>Icon Only</h2>
    <blockquote>icon-only prop으로 아이콘 단독 사용</blockquote>
    <cm-button variant="outline" size="md" icon-only aria-label="더보기">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
        <path
          d="M10 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm0 5.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm1.5 7a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"
        />
      </svg>
    </cm-button>

    <!-- Round -->
    <h2>Round</h2>
    <blockquote>round prop으로 border-radius 100px 처리</blockquote>
    <div class="flex flex-wrap items-center gap-3">
      <cm-button variant="solid-black" size="md" round>태그 버튼</cm-button>
      <cm-button variant="outline" size="xs" round>취소</cm-button>
    </div>

    <!-- Radius SM (6px) -->
    <h2>Radius SM (6px)</h2>
    <blockquote>radius-sm prop으로 border-radius 6px 처리</blockquote>
    <div class="flex flex-wrap items-center gap-3">
      <cm-button variant="outline" size="2xs" radius-sm>전체</cm-button>
    </div>

    <!-- Text Only -->
    <h2>Text Only</h2>
    <blockquote>variant="text" 적용 시 텍스트 버튼, .is-muted 클래스로 비활성 색상 적용</blockquote>
    <div class="flex flex-wrap items-center gap-4">
      <cm-button variant="text" size="xl">Text</cm-button>
      <cm-button variant="text" size="xl" class="is-muted">Text (muted)</cm-button>
    </div>

    <h2>Disabled</h2>
    <blockquote>disabled prop으로 비활성 상태 적용</blockquote>
    <div class="flex flex-wrap items-center gap-3">
      <cm-button variant="primary" size="lg" disabled>Primary</cm-button>
      <cm-button variant="outline" size="lg" disabled>Outline</cm-button>
      <cm-button variant="text" size="lg" disabled>Text</cm-button>
    </div>
  </div>
</template>

<style></style>
