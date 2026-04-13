<script lang="ts" setup>
import { VueDatePicker, type RangeConfig, type TimeConfig } from '@vuepic/vue-datepicker';
import { ko, type Locale } from 'date-fns/locale';
import '@vuepic/vue-datepicker/dist/main.css';
import dayjs from 'dayjs';

interface Props {
  label?: string;
  desc?: string;
  format?: string;
  required?: boolean;
  requiredMsg?: string;
  dataRequiredMsg?: string;
  rangeLimit?: [number, 'day' | 'month'];

  range?: boolean | RangeConfig;
  multiCalendars?: boolean;
  yearPicker?: boolean;
  monthPicker?: boolean;
  timePicker?: boolean;
  weekPicker?: boolean;
  locale?: Locale;
  clearable?: boolean;
  autoApply?: boolean;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  minDate?: Date | string;
  maxDate?: Date | string;
  minTime?: { hours: number; minutes: number; seconds?: number };
  maxTime?: { hours: number; minutes: number; seconds?: number };
  timePickerInline?: boolean;
  enableTimePicker?: boolean;
  enableSeconds?: boolean;
  hoursIncrement?: number | string;
  minutesIncrement?: number | string;
  secondsIncrement?: number | string;
  startTime?:
    | { hours?: number; minutes?: number; seconds?: number }
    | { hours?: number; minutes?: number; seconds?: number }[];
  disabledDates?: Date[] | string[] | ((date: Date) => boolean);
}

const props = withDefaults(defineProps<Props>(), {
  format: 'yyyy-MM-dd',
  required: false,
  range: false,
  multiCalendars: false,
  yearPicker: false,
  monthPicker: false,
  timePicker: false,
  weekPicker: false,
  locale: () => {
    return ko;
  },
  clearable: true,
  autoApply: false,
  placeholder: '날짜를 선택해주세요.',
  disabled: false,
  readonly: false,
  timePickerInline: false,
  enableTimePicker: false,
  enableSeconds: false,
  hoursIncrement: 1,
  minutesIncrement: 5,
  secondsIncrement: 10,
});

const emits = defineEmits(['change', 'click-date', 'invalid-select', 'invalid-date', 'range-start', 'range-end']);
const modelValue = defineModel();

const value = ref();
const invalidMsg = ref('');

const limitMinDate = ref();
const limitMaxDate = ref();

const datepickerRef = ref();

const invalid = computed(() => {
  return invalidMsg.value && invalidMsg.value.length > 0;
});

const timeConfig = computed(() => {
  return {
    timePickerInline: props.timePickerInline,
    enableTimePicker: props.enableTimePicker,
    enableSeconds: props.enableSeconds,
    hoursIncrement: props.hoursIncrement,
    minutesIncrement: props.minutesIncrement,
    secondsIncrement: props.secondsIncrement,
    startTime: props.startTime,
  } as Partial<TimeConfig>;
});

watch(
  () => modelValue.value,
  () => {
    value.value = modelValue.value;
  },
  {
    immediate: true,
  },
);

// 날짜 변경 이벤트 핸들러
function handleUpdateValue(date: string) {
  modelValue.value = date;
  emits('change');
}

// 날짜 클릭 이벤트 핸들러
function handleUpdateDate(e: Date) {
  emits('click-date', e);
}

// 날짜 선택하지 않은 경우 이벤트 핸들러
function handleInvalidSelect() {
  emits('invalid-select');
}

// 선택 불가능 날짜 클릭 이벤트 핸들러
function handleInvalidDate(e: Date) {
  emits('invalid-date', e);
}

// 범위 시작일 선택 이벤트 핸들러
function handleRangeStart(e: Date) {
  emits('range-start', e);
  if (!props.rangeLimit) {
    return;
  }
  // 제한 일수와 단위 추출
  const [days, type] = props.rangeLimit;
  const minDate = props.minDate ? dayjs(props.minDate) : null;
  const rangeMin = dayjs(e).subtract(days, type);
  // 최소 날짜
  limitMinDate.value = minDate?.isAfter(rangeMin) ? minDate : rangeMin;
  // 최대 날짜
  limitMaxDate.value = dayjs(e).add(days, type);
}

// 범위 종료일 선택 이벤트 핸들러
function handleRangeEnd(e: Date) {
  limitMinDate.value = undefined;
  limitMaxDate.value = undefined;
  emits('range-end', e);
}

// 입력 검증
function validate() {
  const value = modelValue.value;
  if (props.required && (!value || (value as string).trim().length === 0)) {
    if (!props.requiredMsg || props.requiredMsg.length === 0) {
      console.info('[vDatepicker] Require required-msg');
    }
    invalidMsg.value = props.requiredMsg || '';
    return false;
  }

  invalidMsg.value = '';
  return true;
}

// 포커스
function focus() {
  datepickerRef.value.openMenu();
}

defineExpose({
  validate,
  focus,
  dataRequiredMsg: props.dataRequiredMsg,
});
</script>

<template>
  <div class="v-datepicker" :class="{ 'has-error': invalid }">
    <label
      v-if="props.label && props.label.length > 0"
      class="v-textfield__label"
      :class="{ required: props.required }"
    >
      {{ props.label }}
    </label>
    <div class="v-datepicker__input-wrapper" :class="{ 'is-disabled': disabled }">
      <vue-date-picker
        ref="datepickerRef"
        v-model="value"
        :range="props.range"
        :multi-calendars="props.multiCalendars"
        :year-picker="props.yearPicker"
        :month-picker="props.monthPicker"
        :time-picker="props.timePicker"
        :week-picker="props.weekPicker"
        :locale="props.locale"
        :clearable="clearable"
        :auto-apply="autoApply"
        :placeholder="placeholder"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :min-date="limitMinDate ?? props.minDate"
        :max-date="limitMaxDate ?? props.maxDate"
        :min-time="props.minTime"
        :max-time="props.maxTime"
        :time-config="timeConfig"
        :disabled-dates="props.disabledDates"
        :week-start="0"
        :year-range="[2000, 2050]"
        :action-row="{
          selectBtnLabel: '선택',
          cancelBtnLabel: '취소',
        }"
        :formats="{
          input: props.format,
          preview: props.format,
        }"
        year-first
        @update:model-value="handleUpdateValue"
        @date-update="handleUpdateDate"
        @invalid-select="handleInvalidSelect"
        @invalid-date="handleInvalidDate"
        @range-start="handleRangeStart"
        @range-end="handleRangeEnd"
      >
      </vue-date-picker>
    </div>
    <div v-if="!invalid && props.desc && props.desc.length > 0" class="v-textfield__desc">{{ props.desc }}</div>
    <div v-if="invalid" class="v-textfield__desc">{{ invalidMsg }}</div>
  </div>
</template>

<style></style>
