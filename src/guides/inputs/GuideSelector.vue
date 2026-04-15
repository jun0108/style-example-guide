<script lang="ts" setup>
const checkbox = ref([]);
const modeCheckbox = ref([]);
const singleCheckbox = ref(true);
const radio = ref(1);
const iconList = ref([
  {
    cdId: 'GN00000646',
    cdNm: '가스원격검침',
    parentCdId: 'GN00000645',
    cdOrder: '1',
    paramVal: 'images/icon/component__line.svg',
  },
  {
    cdId: 'GN00000647',
    cdNm: '공공공장관리',
    parentCdId: 'GN00000645',
    cdOrder: '2',
    paramVal: 'images/icon/component__line.svg',
  },
  {
    cdId: 'GN00000648',
    cdNm: '누수탐지',
    parentCdId: 'GN00000645',
    cdOrder: '3',
    paramVal: 'images/icon/component__line.svg',
  },
  {
    cdId: 'GN00000649',
    cdNm: '대물관제',
    parentCdId: 'GN00000645',
    cdOrder: '4',
    paramVal: 'images/icon/component__line.svg',
  },
  {
    cdId: 'GN00000650',
    cdNm: '라우터',
    parentCdId: 'GN00000645',
    cdOrder: '5',
    paramVal: 'images/icon/component__line.svg',
  },
  {
    cdId: 'GN00000651',
    cdNm: '렌터카',
    parentCdId: 'GN00000645',
    cdOrder: '6',
    paramVal: 'images/icon/component__line.svg',
  },
  {
    cdId: 'GN00000652',
    cdNm: '모빌리티 기타',
    parentCdId: 'GN00000645',
    cdOrder: '7',
    paramVal: 'images/icon/component__line.svg',
  },
  {
    cdId: 'GN00000653',
    cdNm: '배관망관리',
    parentCdId: 'GN00000645',
    cdOrder: '8',
    paramVal: 'images/icon/component__line.svg',
  },
  {
    cdId: 'GN00000764',
    cdNm: '블랙박스',
    parentCdId: 'GN00000645',
    cdOrder: '9',
    paramVal: 'images/icon/component__line.svg',
  },
  {
    cdId: 'GN00000765',
    cdNm: '사물위치관제',
    parentCdId: 'GN00000645',
    cdOrder: '10',
    paramVal: 'images/icon/component__line.svg',
  },
  {
    cdId: 'GN00000766',
    cdNm: '상태관리',
    parentCdId: 'GN00000645',
    cdOrder: '11',
    paramVal: 'images/icon/component__line.svg',
  },
  {
    cdId: 'GN00000767',
    cdNm: '수도원격검침',
    parentCdId: 'GN00000645',
    cdOrder: '12',
    paramVal: 'images/icon/component__line.svg',
  },
  {
    cdId: 'GN00000768',
    cdNm: '시설상태관리',
    parentCdId: 'GN00000645',
    cdOrder: '13',
    paramVal: 'images/icon/component__line.svg',
  },
  {
    cdId: 'GN00000769',
    cdNm: '에너지상태관리',
    parentCdId: 'GN00000645',
    cdOrder: '14',
    paramVal: 'images/icon/component__line.svg',
  },
  {
    cdId: 'GN00000770',
    cdNm: '에코솔루션',
    parentCdId: 'GN00000645',
    cdOrder: '15',
    paramVal: 'images/icon/component__line.svg',
  },
  {
    cdId: 'GN00000771',
    cdNm: '장치상태관리',
    parentCdId: 'GN00000645',
    cdOrder: '16',
    paramVal: 'images/icon/component__line.svg',
  },
  {
    cdId: 'GN00000772',
    cdNm: '전기차충전기',
    parentCdId: 'GN00000645',
    cdOrder: '17',
    paramVal: 'images/icon/component__line.svg',
  },
  {
    cdId: 'GN00000773',
    cdNm: '지하시설물관리',
    parentCdId: 'GN00000645',
    cdOrder: '18',
    paramVal: 'images/icon/component__line.svg',
  },
  {
    cdId: 'GN00000774',
    cdNm: '차량기타',
    parentCdId: 'GN00000645',
    cdOrder: '19',
    paramVal: 'images/icon/component__line.svg',
  },
  {
    cdId: 'GN00000775',
    cdNm: '특수차량',
    parentCdId: 'GN00000645',
    cdOrder: '20',
    paramVal: 'images/icon/component__line.svg',
  },
  {
    cdId: 'GN00000776',
    cdNm: '한국전력',
    parentCdId: 'GN00000645',
    cdOrder: '21',
    paramVal: 'images/icon/component__line.svg',
  },
  {
    cdId: 'GN00000777',
    cdNm: '환경상태관리',
    parentCdId: 'GN00000645',
    cdOrder: '22',
    paramVal: 'images/icon/component__line.svg',
  },
  {
    cdId: 'GN00000778',
    cdNm: 'LPG 탱크관리',
    parentCdId: 'GN00000645',
    cdOrder: '23',
    paramVal: 'images/icon/component__line.svg',
  },
  {
    cdId: 'GN00000779',
    cdNm: 'PMV',
    parentCdId: 'GN00000645',
    cdOrder: '24',
    paramVal: 'images/icon/component__line.svg',
  },
]);

function getIcon(path: string) {
  return import.meta.env.BASE_URL + path;
}
</script>

<template>
  <div>
    <h1>Selector</h1>

    <h2>Checkbox</h2>
    <div class="flex flex-wrap items-center gap-10">
      <v-checkbox v-model="singleCheckbox" :true-value="true" :false-value="false" />

      <v-checkbox
        v-model="singleCheckbox"
        :options="[{ label: '아이디 저장' }]"
        :true-value="true"
        :false-value="false"
      />

      <v-checkbox
        v-model="checkbox"
        label="라벨"
        required
        :options="[
          { value: 1, label: '옵션 1' },
          { value: 2, label: '옵션 2' },
          { value: 3, label: '옵션 3' },
        ]"
      />
    </div>

    <h2>Checkbox Round style</h2>
    <div class="flex flex-wrap items-center gap-10">
      <v-checkbox
        v-model="singleCheckbox"
        :true-value="true"
        class="v-selector--round"
        label="Checkbox"
        :options="[
          { value: 1, label: '옵션 1' },
          { value: 2, label: '옵션 2' },
          { value: 3, label: '옵션 3' },
        ]"
        :false-value="false"
      />
    </div>

    <h2>Checkbox Outline style (h:40px)</h2>
    <div class="grid grid-cols-2 gap-3">
      <div class="form__field">
        <label class="v-textfield__label">Outline style</label>
        <v-checkbox
          v-model="singleCheckbox"
          :options="[
            {
              value: 1,
              label: 'Text',
            },
          ]"
          class="v-selector--outline size--sm"
          :class="{ 'is-checked': singleCheckbox === true }"
          :true-value="true"
          :false-value="false"
        />
      </div>

      <div class="form__field">
        <label class="v-textfield__label">Green</label>
        <v-checkbox
          v-model="singleCheckbox"
          :options="[
            {
              value: 1,
              label: '온라인',
            },
          ]"
          class="v-selector--outline is-green size--sm"
          :class="{ 'is-checked': singleCheckbox === true }"
          :true-value="true"
          :false-value="false"
        />
      </div>

      <div class="form__field">
        <label class="v-textfield__label">Yellow</label>
        <v-checkbox
          v-model="singleCheckbox"
          :options="[
            {
              value: 1,
              label: '약전계',
            },
          ]"
          class="v-selector--outline is-orange size--sm"
          :class="{ 'is-checked': singleCheckbox === true }"
          :true-value="true"
          :false-value="false"
        />
      </div>

      <div class="form__field">
        <label class="v-textfield__label">Gray</label>
        <v-checkbox
          v-model="singleCheckbox"
          :options="[
            {
              value: 1,
              label: '오프라인',
            },
          ]"
          class="v-selector--outline is-gray size--sm"
          :class="{ 'is-checked': singleCheckbox === true }"
          :true-value="true"
          :false-value="false"
        />
      </div>
    </div>

    <h2>Checkbox Outline style (h:44px)</h2>
    <div class="grid grid-cols-2 gap-3">
      <div class="form__field">
        <label class="v-textfield__label">Outline style</label>
        <v-checkbox
          v-model="singleCheckbox"
          :options="[
            {
              value: 1,
              label: 'Text',
            },
          ]"
          class="v-selector--outline"
          :class="{ 'is-checked': singleCheckbox === true }"
          :true-value="true"
          :false-value="false"
        />
      </div>

      <div class="form__field">
        <label class="v-textfield__label">green</label>
        <v-checkbox
          v-model="singleCheckbox"
          :options="[
            {
              value: 1,
              label: '온라인',
            },
          ]"
          class="v-selector--outline is-green"
          :class="{ 'is-checked': singleCheckbox === true }"
          :true-value="true"
          :false-value="false"
        />
      </div>

      <div class="form__field">
        <label class="v-textfield__label">Yellow</label>
        <v-checkbox
          v-model="singleCheckbox"
          :options="[
            {
              value: 1,
              label: '약전계',
            },
          ]"
          class="v-selector--outline is-orange"
          :class="{ 'is-checked': singleCheckbox === true }"
          :true-value="true"
          :false-value="false"
        />
      </div>

      <div class="form__field">
        <label class="v-textfield__label">gray</label>
        <v-checkbox
          v-model="singleCheckbox"
          :options="[
            {
              value: 1,
              label: '오프라인',
            },
          ]"
          class="v-selector--outline is-gray"
          :class="{ 'is-checked': singleCheckbox === true }"
          :true-value="true"
          :false-value="false"
        />
      </div>
    </div>

    <h2>Checkbox Outline style (h:52px)</h2>
    <div class="grid grid-cols-2 gap-3">
      <div class="form__field">
        <label class="v-textfield__label">Outline style</label>
        <v-checkbox
          v-model="singleCheckbox"
          :options="[
            {
              value: 1,
              label: 'Text',
            },
          ]"
          class="v-selector--outline size--lg"
          :class="{ 'is-checked': singleCheckbox === true }"
          :true-value="true"
          :false-value="false"
        />
      </div>

      <div class="form__field">
        <label class="v-textfield__label">Green</label>
        <v-checkbox
          v-model="singleCheckbox"
          :options="[
            {
              value: 1,
              label: '온라인',
            },
          ]"
          class="v-selector--outline is-green size--lg"
          :class="{ 'is-checked': singleCheckbox === true }"
          :true-value="true"
          :false-value="false"
        />
      </div>

      <div class="form__field">
        <label class="v-textfield__label">Yellow</label>
        <v-checkbox
          v-model="singleCheckbox"
          :options="[
            {
              value: 1,
              label: '약전계',
            },
          ]"
          class="v-selector--outline is-orange size--lg"
          :class="{ 'is-checked': singleCheckbox === true }"
          :true-value="true"
          :false-value="false"
        />
      </div>

      <div class="form__field">
        <label class="v-textfield__label">Gray</label>
        <v-checkbox
          v-model="singleCheckbox"
          :options="[
            {
              value: 1,
              label: '오프라인',
            },
          ]"
          class="v-selector--outline is-gray size--lg"
          :class="{ 'is-checked': singleCheckbox === true }"
          :true-value="true"
          :false-value="false"
        />
      </div>
    </div>

    <hr />

    <h2>Radio Small (20px)</h2>
    <div class="grid grid-cols-2 gap-3">
      <v-radio
        v-model="radio"
        label="라디오 선택"
        class="size--sm"
        :options="[
          { value: 1, label: '옵션 1' },
          { value: 2, label: '옵션 2' },
          { value: 3, label: '옵션 3' },
        ]"
        required
      />
    </div>

    <h2>Radio (24px)</h2>
    <div class="grid grid-cols-2 gap-3">
      <v-radio
        v-model="radio"
        label="라디오 선택"
        :options="[
          { value: 1, label: '옵션 1' },
          { value: 2, label: '옵션 2' },
          { value: 3, label: '옵션 3' },
        ]"
        required
      />
    </div>

    <h2>Radio Check Round style</h2>
    <div class="grid grid-cols-2 gap-3">
      <v-radio
        v-model="radio"
        label="라디오 선택"
        class="v-selector--round"
        :options="[
          { value: 1, label: '옵션 1' },
          { value: 2, label: '옵션 2' },
          { value: 3, label: '옵션 3' },
        ]"
        required
      />
    </div>

    <h2>Radio Small Outline(h:40px)</h2>
    <div class="grid grid-cols-2 gap-3">
      <v-radio
        v-model="radio"
        label="라디오 선택"
        class="v-selector--outline size--sm"
        :options="[
          { value: 1, label: '옵션 1' },
          { value: 2, label: '옵션 2' },
          { value: 3, label: '옵션 3' },
        ]"
        required
      />
    </div>

    <h2>Radio Outline(h:44px)</h2>
    <div class="grid grid-cols-2 gap-3">
      <v-radio
        v-model="radio"
        label="라디오 선택"
        class="v-selector--outline"
        :options="[
          { value: 1, label: '옵션 1' },
          { value: 2, label: '옵션 2' },
          { value: 3, label: '옵션 3' },
        ]"
        required
      />
    </div>

    <h2>Radio Large Outline(h:52px)</h2>
    <div class="grid grid-cols-2 gap-3">
      <v-radio
        v-model="radio"
        label="라디오 선택"
        class="v-selector--outline size--lg"
        :options="[
          { value: 1, label: '옵션 1' },
          { value: 2, label: '옵션 2' },
          { value: 3, label: '옵션 3' },
        ]"
        required
      />
    </div>

    <h2>Radio Outline style (h:44px)</h2>
    <div class="grid grid-cols-1">
      <v-radio
        v-model="radio"
        class="v-selector--outline v-selector--mode"
        :options="[
          { value: 'light', label: '라이트 모드' },
          { value: 'dark', label: '다크모드' },
        ]"
      >
      </v-radio>
    </div>

    <h2>Radio Check Outline style (h:44px)</h2>
    <div class="grid grid-cols-1">
      <v-radio
        v-model="modeCheckbox"
        class="v-selector--outline v-selector--mode v-selector--mode-check"
        :options="[
          { value: 'light', label: '라이트 모드' },
          { value: 'dark', label: '다크모드' },
        ]"
      >
      </v-radio>
    </div>

    <h2>Radio Outline Right Icon(h:52px)</h2>
    <div class="grid grid-cols-1">
      <v-radio
        v-model="radio"
        class="v-selector--outline has-icon"
        :options="iconList"
        label-key="cdNm"
        value-key="cdId"
      >
        <template #icon="{ option }">
          <i class="v-selector__icon">
            <img :src="getIcon(option.paramVal)" alt="아이콘" />
          </i>
        </template>
      </v-radio>
    </div>
  </div>
</template>

<style lang="scss">
.v-selector {
  flex: none;
}
</style>
