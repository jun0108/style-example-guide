<script lang="ts" setup>
const selectorProps = [
  { name: 'label', type: 'string', default: 'undefined', desc: '그룹 라벨 텍스트' },
  { name: 'options', type: 'Array', default: '[]', desc: '렌더링할 옵션 목록' },
  { name: 'valueKey', type: 'string', default: `'value'`, desc: '옵션 value 필드명' },
  { name: 'labelKey', type: 'string', default: `'label'`, desc: '옵션 label 필드명' },
  { name: 'descKey', type: 'string', default: `'desc'`, desc: '옵션 서브라벨 필드명' },
  { name: 'disabled', type: 'boolean', default: 'false', desc: '비활성화 상태' },
  { name: 'required', type: 'boolean', default: 'false', desc: '필수 입력 여부' },
  { name: 'requiredMsg', type: 'string', default: 'undefined', desc: '필수 입력 검증 실패 메시지' },
  { name: 'desc', type: 'string', default: 'undefined', desc: '그룹 하단 설명 문구' },
  { name: 'trueValue / falseValue', type: 'any', default: 'true / false', desc: '단일 체크박스 상태값' },
];

const selectorStyleGuides = [
  { name: '기본 블록', value: 'v-selector', desc: '체크박스와 라디오가 공유하는 루트 클래스입니다.' },
  { name: '크기', value: 'v-selector--md / v-selector--lg', desc: '행 높이와 라벨 타이포그래피를 조정합니다.' },
  { name: '리스트', value: 'v-selector__list', desc: '복수 옵션을 세로 목록 간격으로 정렬합니다.' },
  { name: '상태', value: 'is-disabled / is-error', desc: '루트에서 상태를 받고 하위 입력과 라벨에 전파합니다.' },
];

const checkboxLabelOption = [{ label: '기본 라벨' }];
const checkboxSubLabelOption = [{ label: '기본 라벨', desc: '서브 라벨 텍스트' }];

const radioStandaloneOption = [{ value: 'single', label: '' }];
const radioLabelOption = [{ value: 'single', label: '기본 라벨' }];
const radioSubLabelOption = [{ value: 'single', label: '기본 라벨', desc: '서브 라벨 텍스트' }];

const checkboxStandaloneDefault = ref(false);
const checkboxStandaloneChecked = ref(true);
const checkboxStandaloneCheckedDisabled = ref(true);

const checkboxLabelDefault = ref(false);
const checkboxLabelChecked = ref(true);
const checkboxLabelCheckedDisabled = ref(true);

const checkboxSubDefault = ref(false);
const checkboxSubChecked = ref(true);
const checkboxSubCheckedDisabled = ref(true);

const radioStandaloneDefault = ref('');
const radioStandaloneChecked = ref('single');
const radioStandaloneCheckedDisabled = ref('single');

const radioLabelDefault = ref('');
const radioLabelChecked = ref('single');
const radioLabelCheckedDisabled = ref('single');

const radioSubDefault = ref('');
const radioSubChecked = ref('single');
const radioSubCheckedDisabled = ref('single');

const checkboxGuideMd = ref(true);
const checkboxGuideLg = ref(true);
const radioGuideMd = ref('single');
const radioGuideLg = ref('single');

const checkboxList = ref([1, 3]);
const radioList = ref('warning');

const checkboxListOptions = [
  { value: 1, label: '서울 센터' },
  { value: 2, label: '부산 센터' },
  { value: 3, label: '대전 센터' },
  { value: 4, label: '광주 센터' },
];

const radioListOptions = [
  { value: 'all', label: '전체 보기' },
  { value: 'online', label: '온라인 보기' },
  { value: 'warning', label: '점검 필요' },
  { value: 'offline', label: '오프라인' },
];
</script>

<template>
  <main class="guide-page">
    <h1>셀렉터</h1>

    <section class="guide-section">
      <h2>스타일 기준</h2>
      <table class="guide-table">
        <thead>
          <tr>
            <th>구분</th>
            <th>클래스</th>
            <th>설명</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="guide in selectorStyleGuides" :key="guide.value">
            <td>{{ guide.name }}</td>
            <td>
              <code>{{ guide.value }}</code>
            </td>
            <td>{{ guide.desc }}</td>
          </tr>
        </tbody>
      </table>
    </section>

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
          <tr v-for="prop in selectorProps" :key="prop.name">
            <td>
              <code>{{ prop.name }}</code>
            </td>
            <td>
              <code>{{ prop.type }}</code>
            </td>
            <td>
              <code>{{ prop.default }}</code>
            </td>
            <td>{{ prop.desc }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="guide-section">
      <h2>상태</h2>
      <blockquote>체크박스와 라디오는 선택 표시만 다르고 라벨 구조와 간격 규칙은 동일합니다.</blockquote>

      <ul class="guide-list-stack">
        <li class="guide-section guide-section--sm guide-surface">
          <span class="guide-text-subtle"><code>checkbox</code></span>
          <table class="guide-table">
            <thead>
              <tr>
                <th>Pattern</th>
                <th>Default</th>
                <th>Disabled</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>단독</td>
                <td><v-checkbox v-model="checkboxStandaloneDefault" :true-value="true" :false-value="false" /></td>
                <td>
                  <v-checkbox v-model="checkboxStandaloneDefault" :true-value="true" :false-value="false" disabled />
                </td>
              </tr>
              <tr>
                <td>라벨</td>
                <td>
                  <v-checkbox
                    v-model="checkboxLabelDefault"
                    :options="checkboxLabelOption"
                    :true-value="true"
                    :false-value="false"
                  />
                </td>
                <td>
                  <v-checkbox
                    v-model="checkboxLabelDefault"
                    :options="checkboxLabelOption"
                    :true-value="true"
                    :false-value="false"
                    disabled
                  />
                </td>
              </tr>
              <tr>
                <td>라벨 + 서브라벨</td>
                <td>
                  <v-checkbox
                    v-model="checkboxSubDefault"
                    :options="checkboxSubLabelOption"
                    desc-key="desc"
                    :true-value="true"
                    :false-value="false"
                  />
                </td>
                <td>
                  <v-checkbox
                    v-model="checkboxSubDefault"
                    :options="checkboxSubLabelOption"
                    desc-key="desc"
                    :true-value="true"
                    :false-value="false"
                    disabled
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </li>

        <li class="guide-section guide-section--sm guide-surface">
          <span class="guide-text-subtle"><code>radio</code></span>
          <table class="guide-table">
            <thead>
              <tr>
                <th>Pattern</th>
                <th>Default</th>
                <th>Disabled</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>단독</td>
                <td><v-radio v-model="radioStandaloneDefault" :options="radioStandaloneOption" /></td>
                <td><v-radio v-model="radioStandaloneDefault" :options="radioStandaloneOption" disabled /></td>
              </tr>
              <tr>
                <td>라벨</td>
                <td><v-radio v-model="radioLabelDefault" :options="radioLabelOption" /></td>
                <td><v-radio v-model="radioLabelDefault" :options="radioLabelOption" disabled /></td>
              </tr>
              <tr>
                <td>라벨 + 서브라벨</td>
                <td><v-radio v-model="radioSubDefault" :options="radioSubLabelOption" desc-key="desc" /></td>
                <td><v-radio v-model="radioSubDefault" :options="radioSubLabelOption" desc-key="desc" disabled /></td>
              </tr>
            </tbody>
          </table>
        </li>
      </ul>
    </section>

    <section class="guide-section">
      <h2>크기와 리스트</h2>
      <blockquote>
        실사용 기준으로 라벨 + 서브라벨 패턴의 <code>md</code>/<code>lg</code> 차이와 리스트 간격을 확인합니다.
      </blockquote>

      <ul class="guide-list-stack">
        <li class="guide-section guide-section--sm guide-surface">
          <span class="guide-text-subtle"><code>size</code></span>
          <ul class="guide-split-list">
            <li class="guide-section guide-section--sm">
              <span class="guide-text-subtle"><code>md</code></span>
              <div class="guide-section guide-section--sm">
                <v-checkbox
                  v-model="checkboxGuideMd"
                  class="v-selector--md"
                  :options="checkboxSubLabelOption"
                  desc-key="desc"
                  :true-value="true"
                  :false-value="false"
                />
                <v-radio v-model="radioGuideMd" class="v-selector--md" :options="radioSubLabelOption" desc-key="desc" />
              </div>
            </li>

            <li class="guide-section guide-section--sm">
              <span class="guide-text-subtle"><code>lg</code></span>
              <div class="guide-section guide-section--sm">
                <v-checkbox
                  v-model="checkboxGuideLg"
                  class="v-selector--lg"
                  :options="checkboxSubLabelOption"
                  desc-key="desc"
                  :true-value="true"
                  :false-value="false"
                />
                <v-radio v-model="radioGuideLg" class="v-selector--lg" :options="radioSubLabelOption" desc-key="desc" />
              </div>
            </li>
          </ul>
        </li>

        <li class="guide-section guide-section--sm guide-surface">
          <span class="guide-text-subtle"><code>list</code></span>
          <ul class="guide-split-list">
            <li class="guide-section guide-section--sm">
              <span class="guide-text-subtle"><code>md</code></span>
              <div class="guide-section guide-section--sm">
                <span class="guide-text-subtle"><code>checkbox list</code></span>
                <div class="v-selector__list">
                  <v-checkbox v-model="checkboxList" class="v-selector--md" :options="checkboxListOptions" />
                </div>
              </div>
              <div class="guide-section guide-section--sm">
                <span class="guide-text-subtle"><code>radio list</code></span>
                <div class="v-selector__list">
                  <v-radio v-model="radioList" class="v-selector--md" :options="radioListOptions" />
                </div>
              </div>
            </li>

            <li class="guide-section guide-section--sm">
              <span class="guide-text-subtle"><code>lg</code></span>
              <div class="guide-section guide-section--sm">
                <span class="guide-text-subtle"><code>checkbox list</code></span>
                <div class="v-selector__list">
                  <v-checkbox v-model="checkboxList" class="v-selector--lg" :options="checkboxListOptions" />
                </div>
              </div>
              <div class="guide-section guide-section--sm">
                <span class="guide-text-subtle"><code>radio list</code></span>
                <div class="v-selector__list">
                  <v-radio v-model="radioList" class="v-selector--lg" :options="radioListOptions" />
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </section>
  </main>
</template>
