<script lang="ts" setup>
import PageLayout from '@/components/layout/PageLayout.vue';
import SearchCondition from '@/components/layout/SearchCondition.vue';

const formData = ref({
  page: 1,
  total: 990,
  size: 10,
});
const tabsEn = [
  { name: 'text', key: 'tab1' },
  { name: 'text', key: 'tab2' },
  { name: 'text', key: 'tab3' },
];
const activeTabSegment = ref('tab1');

const ex1Client = ref('a');
const ex1Manufacturer = ref('all');
const ex1SearchKeyword = ref('');

const ex2Date = ref('');
const ex2Client = ref('a');
const ex2Device = ref('all');

const clientOptions = [
  { value: '1', label: '텍스트' },
  { value: '2', label: '텍스트' },
];
const allOptions = [{ value: 'all', label: '전체' }, ...clientOptions];

function handleChange() {
  console.log('change tab');
}
function handleReset() {
  console.log('reset');
}
function handleSearch() {
  console.log('search');
}
function handleChangePage() {
  console.log('change page');
}
function handleChangeSize() {
  console.log('change size');
}
</script>

<template>
  <PageLayout title="목록 템플릿">
    <!-- Search Condition Case 1 -->
    <search-condition @reset="handleReset" @search="handleSearch">
      <v-datepicker v-model="ex2Date" label="기간" placeholder="전체" />
      <v-dropdown
        v-model="ex2Client"
        label="고객사"
        placeholder="선택"
        :options="allOptions"
        label-key="label"
        value-key="value"
      />
      <v-dropdown
        v-model="ex2Device"
        label="단말 모델"
        placeholder="선택"
        :options="allOptions"
        label-key="label"
        value-key="value"
      />
    </search-condition>

    <!-- Search Condition Case 2 -->
    <search-condition @reset="handleReset" @search="handleSearch">
      <v-dropdown
        v-model="ex1Client"
        label="단말 모델"
        placeholder="선택"
        :options="allOptions"
        label-key="label"
        value-key="value"
      />
      <v-textfield v-model="ex1SearchKeyword" label="수신자 번호" :placeholder="`수신자 번호를 입력하세요.`" />
      <div class="search-condition__group">
        <v-dropdown
          v-model="ex1Manufacturer"
          label="항목 검색"
          placeholder="선택"
          :options="allOptions"
          label-key="label"
          value-key="value"
        />
        <v-textfield v-model="ex1SearchKeyword" :placeholder="`식별번호(CTN)를 검색해주세요.`" />
      </div>
    </search-condition>

    <template #bottomTab>
      <cm-tab v-model="activeTabSegment" type="segment" :tabs="tabsEn" @change="handleChange" />
    </template>
    <template #footer>
      <cm-pagination :total="formData.total" @change:page="handleChangePage" @change:size="handleChangeSize" />
    </template>
  </PageLayout>
</template>

<style lang="scss" scoped></style>
