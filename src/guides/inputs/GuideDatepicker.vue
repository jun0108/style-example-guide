<script lang="ts" setup>
import dayjs from 'dayjs';

const date = ref('');
const dateDisabled = ref('2025-07-25');

const datetime = ref('');

const range = ref([]);

function handleInavlidDate(date: Date) {
  console.log('선택 불가능한 날짜 입니다', date);
}
</script>

<template>
  <div>
    <h1>Datepicker</h1>

    <h2>Single Date</h2>
    <div class="grid grid-cols-3 gap-3">
      <v-datepicker v-model="date" label="기본" />
      <v-datepicker v-model="date" label="필수" required />
      <v-datepicker v-model="dateDisabled" label="비활성화" disabled />
      <v-datepicker v-model="date" label="설명" desc="날짜를 선택하세요" />
      <v-datepicker label="min-date" min-date="2026-01-30" />
      <v-datepicker label="max-date" max-date="2026-02-15" @invalid-date="handleInavlidDate" />
      <v-datepicker v-model="date" label="auto-apply" auto-apply />
      <v-datepicker
        v-model="date"
        label="disable-dates"
        :disabled-dates="[dayjs().subtract(1, 'd').format('YYYY-MM-DD'), dayjs().add(1, 'd').format('YYYY-MM-DD')]"
      />
    </div>

    <h2>사이즈</h2>
    <div class="grid grid-cols-3 gap-3">
      <v-datepicker v-model="date" label="sm(40px)" class="size--sm" />
      <v-datepicker v-model="date" label="default(44px)" />
      <v-datepicker v-model="date" label="lg(48px)" class="size--lg" />
      <v-datepicker v-model="date" label="xl(56px)" class="size--xl" />
    </div>

    <h2>Single Datetime</h2>
    <div class="grid grid-cols-3 gap-3">
      <v-datepicker v-model="datetime" label="일시 기본" format="yyyy-MM-dd HH:mm" enable-time-picker />
      <v-datepicker
        v-model="datetime"
        label="시간 inline"
        format="yyyy-MM-dd HH:mm"
        enable-time-picker
        time-picker-inline
      />
      <v-datepicker
        v-model="datetime"
        label="enable-seconds"
        format="yyyy-MM-dd HH:mm:ss"
        enable-time-picker
        enable-seconds
      />
    </div>

    <h2>Range Date</h2>
    <div class="grid grid-cols-3 gap-3">
      <v-datepicker v-model="range" label="range 기본" range />
      <v-datepicker
        v-model="range"
        label="min-range"
        :range="{
          minRange: 3,
        }"
      />
      <v-datepicker
        v-model="range"
        label="max-range"
        :range="{
          maxRange: 3,
        }"
      />
      <v-datepicker
        v-model="range"
        label="auto-range"
        :range="{
          autoRange: 3,
        }"
      />
      <v-datepicker
        v-model="range"
        label="min/max dates"
        range
        :min-date="dayjs().subtract(15, 'd').format('YYYY-MM-DD')"
        :max-date="dayjs().add(15, 'd').format('YYYY-MM-DD')"
      />
    </div>
  </div>
</template>

<style></style>
