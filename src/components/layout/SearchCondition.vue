<script lang="ts" setup>
//TODO : 퍼블리싱 작업 완료 후 정리
type ButtonVariant =
  | 'primary'
  | 'outline'
  | 'outline-dark'
  | 'outline-primary'
  | 'outline-shadow'
  | 'solid-black'
  | 'solid-gray'
  | 'text';
type ButtonSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type Props = {
  title?: string;
  tooltipDesc?: string;
  resetText?: string;
  searchText?: string;
  resetVariant?: ButtonVariant;
  searchVariant?: ButtonVariant;
  buttonSize?: ButtonSize;
  activeReset?: boolean;
  activeSearch?: boolean;
  showReset?: boolean;
  showSearch?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  title: '검색 조건',
  tooltipDesc:
    '설정한 검색 조건에 대한 검색 결과가 제공됩니다. 새로운 조건 검색을 원하신다면 [조건 초기화] 버튼을 선택해 주세요.',
  resetText: '초기화',
  searchText: '검색',
  resetVariant: 'outline',
  searchVariant: 'primary',
  buttonSize: 'xl',
  activeReset: false,
  activeSearch: true,
  showReset: true,
  showSearch: true,
});

const emits = defineEmits<{
  (e: 'reset'): void;
  (e: 'search'): void;
}>();

function handleReset() {
  emits('reset');
}
function handleSearch() {
  emits('search');
}
</script>

<template>
  <fieldset class="search-condition">
    <h6 class="search-condition__title">{{ props.title }}</h6>
    <div class="search-condition__body">
      <div class="search-condition__fields">
        <slot />
      </div>
      <div class="search-condition__actions">
        <cm-tooltip v-if="props.tooltipDesc" :desc="props.tooltipDesc" />
        <template v-if="$slots.reset">
          <slot name="reset" />
        </template>
        <cm-button
          v-else-if="props.showReset"
          :variant="props.resetVariant"
          :size="props.buttonSize"
          :disabled="!props.activeReset"
          @click="handleReset"
        >
          <template #append>
            <span class="cm-icon cm-icon--reload" aria-hidden="true" style="width: 20px; height: 20px" />
          </template>
          {{ props.resetText }}
        </cm-button>
        <template v-if="$slots.search">
          <slot name="search" />
        </template>
        <cm-button
          v-else-if="props.showSearch"
          :variant="props.searchVariant"
          :size="props.buttonSize"
          :disabled="!props.activeSearch"
          @click="handleSearch"
        >
          {{ props.searchText }}
        </cm-button>
      </div>
    </div>
  </fieldset>
</template>

<style lang="scss" scoped></style>
