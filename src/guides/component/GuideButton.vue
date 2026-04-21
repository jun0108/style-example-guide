<script lang="ts" setup>
type ButtonColor = 'primary' | 'secondary' | 'neutral';
type ButtonType = 'fill' | 'line' | 'text' | 'underline';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

const colors: ButtonColor[] = ['primary', 'secondary', 'neutral'];
const types: ButtonType[] = ['fill', 'line', 'text', 'underline'];

const sizes: { value: ButtonSize; label: string }[] = [
  { value: 'xl', label: 'xl · 56px' },
  { value: 'lg', label: 'lg · 48px' },
  { value: 'md', label: 'md · 36px (default)' },
  { value: 'sm', label: 'sm · 24px' },
];

const iconOnlySizes: { value: Exclude<ButtonSize, 'xl'>; label: string; icon: number }[] = [
  { value: 'lg', label: 'lg · 48px (icon 32px)', icon: 32 },
  { value: 'md', label: 'md · 36px (icon 24px)', icon: 24 },
  { value: 'sm', label: 'sm · 24px (icon 20px)', icon: 20 },
];

const props = [
  { name: 'color', type: `'primary' | 'secondary' | 'neutral'`, default: `'primary'`, desc: '버튼 컬러 계열' },
  { name: 'type', type: `'fill' | 'line' | 'text' | 'underline'`, default: `'fill'`, desc: '시각적 스타일' },
  { name: 'size', type: `'sm' | 'md' | 'lg' | 'xl'`, default: `'md'`, desc: '버튼 크기 (높이)' },
  { name: 'full', type: 'boolean', default: 'false', desc: '너비 100% 확장' },
  { name: 'iconOnly', type: 'boolean', default: 'false', desc: '아이콘 단독 버튼(정사각 비율)' },
  { name: 'disabled', type: 'boolean', default: 'false', desc: '비활성화 상태' },
];
</script>

<template>
  <div class="guide-page"></div>
  <h1>버튼</h1>

  <section class="guide-section">
    <h2>개요</h2>
    <blockquote>
      <code>color</code> × <code>type</code> × <code>size</code> 조합으로 모든 버튼을 구성합니다.<br />
      아이콘만 사용하는 버튼은 <code>icon-only</code>, 너비 확장은 <code>full</code> prop으로 제어합니다.
    </blockquote>
  </section>

  <!-- Props table -->
  <section class="guide-section">
    <h2>Props</h2>
    <table class="guide-table">
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in props" :key="p.name">
          <td>
            <code>{{ p.name }}</code>
          </td>
          <td>
            <code>{{ p.type }}</code>
          </td>
          <td>
            <code>{{ p.default }}</code>
          </td>
          <td>{{ p.desc }}</td>
        </tr>
      </tbody>
    </table>
  </section>

  <!-- Variants -->
  <section class="guide-section">
    <h2>Variants</h2>
    <blockquote>
      <code>color</code>(3종) × <code>type</code>(4종) 조합으로 제공됩니다.<br />
      활성/비활성 상태를 함께 확인하세요.
    </blockquote>

    <ul class="guide-list-stack">
      <li v-for="color in colors" :key="color" class="guide-section guide-section--sm guide-surface">
        <span class="guide-text-subtle"
          ><code>color="{{ color }}"</code></span
        >
        <div class="guide-row">
          <cm-button v-for="type in types" :key="type" :color="color" :type="type"> {{ color }} {{ type }} </cm-button>
        </div>
        <div class="guide-row">
          <cm-button v-for="type in types" :key="type" :color="color" :type="type" disabled> disabled </cm-button>
        </div>
      </li>
    </ul>
  </section>

  <!-- Sizes -->
  <section class="guide-section">
    <h2>Sizes</h2>
    <blockquote><code>size</code> prop으로 4단계 크기를 제공합니다. 기본값은 <code>md</code>입니다.</blockquote>
    <div class="guide-row guide-row--end">
      <cm-button v-for="s in sizes" :key="s.value" :size="s.value">
        {{ s.label }}
      </cm-button>
    </div>
  </section>

  <!-- Full width -->
  <section class="guide-section">
    <h2>Full Width</h2>
    <blockquote><code>full</code> prop으로 부모 너비 전체를 채웁니다.</blockquote>
    <cm-button full>확인</cm-button>
  </section>

  <!-- Icon prepend / append -->
  <section class="guide-section">
    <h2>Icon prepend / append</h2>
    <blockquote>
      <code>#prepend</code> / <code>#append</code> 슬롯으로 텍스트 좌·우에 아이콘을 배치합니다.<br />
      아이콘 크기는 버튼 <code>size</code>에 맞춰 자동으로 조정됩니다.<br />
      간격을 직접 조절하려면 <code>--cm-button-gap</code> CSS 변수를 재정의하세요.
    </blockquote>

    <div class="guide-row">
      <cm-button v-for="s in sizes" :key="`prepend-${s.value}`" color="secondary" :size="s.value">
        <template #prepend>
          <cm-icon name="search__line" />
        </template>
        prepend {{ s.value }}
      </cm-button>
    </div>

    <div class="guide-row">
      <cm-button v-for="s in sizes" :key="`append-${s.value}`" color="secondary" :size="s.value">
        <template #append>
          <cm-icon name="chevron-right__line" />
        </template>
        append {{ s.value }}
      </cm-button>
    </div>

    <div class="guide-row">
      <cm-button color="primary" size="md" style="--cm-button-gap: 12px">
        <template #prepend>
          <cm-icon name="search__line" />
        </template>
        커스텀 gap (12px)
      </cm-button>
    </div>
  </section>

  <!-- Icon only -->
  <section class="guide-section">
    <h2>Icon Only</h2>
    <blockquote>
      <code>icon-only</code> prop을 적용하면 정사각 비율의 아이콘 전용 버튼이 됩니다.<br />
      사이즈별 아이콘 크기: <code>sm</code> 20px · <code>md</code> 24px · <code>lg</code> 32px.<br />
      접근성을 위해 <code>aria-label</code>을 반드시 지정하세요.
    </blockquote>

    <div class="guide-row">
      <cm-button
        v-for="s in iconOnlySizes"
        :key="s.value"
        color="neutral"
        type="fill"
        :size="s.value"
        icon-only
        aria-label="검색"
      >
        <cm-icon name="search__line" />
      </cm-button>
    </div>

    <div class="guide-row">
      <cm-button
        v-for="s in iconOnlySizes"
        :key="s.value"
        color="neutral"
        type="line"
        :size="s.value"
        icon-only
        aria-label="검색"
      >
        <cm-icon name="search__line" />
      </cm-button>
    </div>

    <div class="guide-row">
      <cm-button
        v-for="s in iconOnlySizes"
        :key="s.value"
        color="neutral"
        type="text"
        :size="s.value"
        icon-only
        aria-label="검색"
      >
        <cm-icon name="search__line" />
      </cm-button>
    </div>
  </section>
</template>
