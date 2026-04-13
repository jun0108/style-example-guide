<script lang="ts" setup>
type Props = {
  size?: string | number;
  total?: string | number;
  count?: number; // 페이지 표시 개수
  sizeOptions?: { value: number; label: string }[];
};

const noti = useNoti();

const props = withDefaults(defineProps<Props>(), {
  size: 10,
  total: 0,
  count: 10,
  sizeOptions: () => {
    return [
      { value: 10, label: '10개씩 보기' },
      { value: 20, label: '20개씩 보기' },
      { value: 30, label: '30개씩 보기' },
      { value: 50, label: '50개씩 보기' },
      { value: 100, label: '100개씩 보기' },
    ];
  },
});

const emits = defineEmits<{
  (e: 'change:page', page: number): void;
  (e: 'change:size', size: number): void;
  (e: 'error', msg: string): void;
}>();

const modelValue = defineModel<string | number>({
  default: 1,
});

const range = ref<number>(1);
const displaySize = ref<number>(10);

const inputRef = ref();

const maxPage = computed(() => {
  return Math.ceil(parseInt(props.total.toString()) / displaySize.value);
});

const maxRange = computed(() => {
  return Math.ceil(maxPage.value / props.count);
});

const page = computed(() => {
  return parseInt(modelValue.value.toString());
});

// 페이지 변경
function changePage(_page: number) {
  modelValue.value = _page;
  changeInputWidth(String(_page).length);
  nextTick(() => {
    emits('change:page', _page);
  });
}

// 첫 페이지 이동
function first() {
  range.value = 1;
  changePage(1);
}

// 이전 페이지 이동
function prev() {
  if (page.value > 1) {
    changePage(page.value - 1);
  }
}

// 다음 페이지 이동
function next() {
  if (page.value < maxPage.value) {
    changePage(page.value + 1);
  }
}

// 마지막 페이지 이동
function last() {
  range.value = maxRange.value;
  nextTick(() => {
    changePage(maxPage.value);
  });
}

// 사이즈 변경 핸들러
function handleChangeDisplaySize() {
  emits('change:size', displaySize.value);
}

// 페이지 입력 핸들러
function handleInputPage(event: Event) {
  const target = event.target as HTMLInputElement;
  target.value = target.value.replace(/[^0-9]/g, '');
  changeInputWidth(target.value.length);
}

// 페이지 변경 핸들러
function handleKeyupEnterPage() {
  const value = inputRef.value.value;
  if (!value || value.trim().length === 0) {
    onError('페이지를 입력해 주세요');
    return;
  }
  if (parseInt(value) < 1 || parseInt(value) > maxPage.value) {
    onError('존재하지 않는 페이지입니다.');
    inputRef.value.value = modelValue.value.toString();
    return;
  }
  changePage(parseInt(value.toString()));
}

// 오류 알림
function onError(msg: string) {
  noti.error(msg);
  emits('error', msg);
}

// 페이지 인풋박스 너비 변경
function changeInputWidth(length: number = 1) {
  inputRef.value.style.width = `calc(${length} * 1.1ch + var(--pagination-item-padding-x) * 2)`;
}

watch(
  () => props.size,
  () => {
    displaySize.value = parseInt(props.size.toString());
  },
  {
    immediate: true,
  },
);

watch(
  () => modelValue.value,
  () => {
    range.value = Math.ceil(page.value / props.count);
  },
  {
    immediate: true,
  },
);

onMounted(() => {});
</script>

<template>
  <div class="cm-pagination">
    <v-dropdown
      v-model="displaySize"
      :options="props.sizeOptions"
      class="cm-pagination__size"
      @change="handleChangeDisplaySize"
    />
    <div class="cm-pagination__page">
      <button class="cm-pagination__button first" :disabled="page === 1" aria-label="첫 페이지로" @click="first" />
      <button class="cm-pagination__button prev" :disabled="page === 1" aria-label="이전 페이지로" @click="prev" />
      <div class="cm-pagination__jump">
        <!-- FIXME :: 입력값에 따라 input 너비가 조정되도록 수정이 필요합니다.
          입력 중에도 글자 수가 CSS 변수 '--digit'에 실시간으로 반영되도록 요청드립니다.
          예시:
        -->
        <input
          ref="inputRef"
          :value="page"
          class="cm-pagination__input"
          @input="handleInputPage"
          @keyup.enter="handleKeyupEnterPage"
        />
        <span class="cm-pagination__seperator">&#47;</span>
        <span class="cm-pagination__total">{{ maxPage }}</span>
      </div>
      <button
        class="cm-pagination__button next"
        :disabled="page === maxPage"
        aria-label="다음 페이지로"
        @click="next"
      />
      <button
        class="cm-pagination__button last"
        :disabled="page === maxPage"
        aria-label="마지막 페이지로"
        @click="last"
      />
    </div>
  </div>
</template>

<style></style>
