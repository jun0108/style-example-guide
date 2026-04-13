<script lang="ts" setup>
const options = ref([
  { label: '옵션 1', value: '1' },
  {
    label: '옵션 2 글자가 길어지는 경우에는 이렇게 보입니다. 글자가 길어질 경우에는 말줄임 처리가 됩니다.',
    value: '2',
  },
  { label: '옵션 3', value: '3' },
  { label: '옵션 4', value: '4' },
  { label: '옵션 5', value: '5' },
  { label: '옵션 6', value: '6' },
  { label: '옵션 7', value: '7' },
  { label: '옵션 8', value: '8' },
]);

const dorpdown1 = ref('');
</script>

<template>
  <div>
    <h1>Dropdown</h1>
    <h2>기본</h2>
    <div class="grid gap-5 grid-cols-3">
      <v-dropdown v-model="dorpdown1" label="드롭다운" :options="options"></v-dropdown>
      <v-dropdown
        ref="dropdownRef"
        v-model="dorpdown1"
        label="드롭다운"
        :options="options"
        required
        required-msg="옵션을 선택하세요"
      ></v-dropdown>
      <v-dropdown v-model="dorpdown1" label="가이드 문구" :options="options" desc="옵션을 선택하세요"></v-dropdown>
      <v-dropdown v-model="dorpdown1" label="disabled" :options="options" disabled></v-dropdown>
    </div>

    <h2>사이즈</h2>
    <div class="grid gap-5 grid-cols-3">
      <v-dropdown v-model="dorpdown1" label="xs(36px)" size="xs" :options="options"></v-dropdown>
      <v-dropdown v-model="dorpdown1" label="sm(40px)" size="sm" :options="options"></v-dropdown>
      <v-dropdown v-model="dorpdown1" label="default(44px)" :options="options"></v-dropdown>
      <v-dropdown v-model="dorpdown1" label="lg(48px)" size="lg" :options="options"></v-dropdown>
      <v-dropdown v-model="dorpdown1" label="xl(56px)" size="xl" :options="options"></v-dropdown>
    </div>

    <h2>가로형태의 라벨</h2>
    <div class="grid grid-cols-3 gap-3">
      <div class="form__field">
        <label class="v-dropdown__label size--xs">xs(36px)</label>
        <v-dropdown v-model="dorpdown1" size="xs" :options="options"></v-dropdown>
      </div>
      <div class="form__field">
        <label class="v-dropdown__label size--sm">sm(40px)</label>
        <v-dropdown v-model="dorpdown1" size="sm" :options="options"></v-dropdown>
      </div>
      <div class="form__field">
        <label class="v-dropdown__label">default(44px)</label>
        <v-dropdown v-model="dorpdown1" :options="options"></v-dropdown>
      </div>
      <div class="form__field">
        <label class="v-dropdown__label size--lg">lg(48px)</label>
        <v-dropdown v-model="dorpdown1" size="lg" :options="options"></v-dropdown>
      </div>
      <div class="form__field">
        <label class="v-dropdown__label size--xl">xl(56px)</label>
        <v-dropdown v-model="dorpdown1" size="xl" :options="options"></v-dropdown>
      </div>
    </div>

    <h2>variation</h2>
    <div class="grid grid-cols-1 gap-3">
      <div class="form__field">
        <v-dropdown
          ref="dropdownRef"
          v-model="dorpdown1"
          :options="options"
          required
          required-msg="옵션을 선택하세요"
        ></v-dropdown>
        <button type="button" class="cm-button cm-button--primary cm-button--md">버튼</button>
      </div>

      <div class="form__field">
        <div class="form__field__control">
          <v-dropdown
            ref="dropdownRef"
            v-model="dorpdown1"
            label="버튼 세로형"
            :options="options"
            required
            required-msg="옵션을 선택하세요"
          ></v-dropdown>
          <button type="button" class="cm-button cm-button--primary cm-button--md">버튼</button>
        </div>
      </div>

      <div class="form__field">
        <label class="v-textfield__label required">버튼 가로형</label>
        <div class="form__field__control">
          <v-dropdown
            ref="dropdownRef"
            v-model="dorpdown1"
            :options="options"
            required
            required-msg="옵션을 선택하세요"
          ></v-dropdown>
          <button type="button" class="cm-button cm-button--primary cm-button--md">버튼</button>
        </div>
      </div>
    </div>

    <h2>메시지 설정</h2>
    <div class="grid grid-cols-1 gap-8">
      <div class="form__group">
        <v-dropdown
          ref="dropdownRef"
          v-model="dorpdown1"
          label="드롭다운"
          :options="options"
          required
          required-msg="옵션을 선택하세요"
        ></v-dropdown>
        <ul class="form__group-desc">
          <!-- 기본 -->
          <li>영문 대소문자, 숫자, 특수문자 혼합</li>
          <!-- 유효성 검사 실패 -->
          <li class="is-fail">영문 대소문자, 숫자, 특수문자 혼합</li>
          <!-- 유효성 검사 성공 -->
          <li class="is-success">영문 대소문자, 숫자, 특수문자 혼합</li>
        </ul>
      </div>

      <div class="form__group">
        <v-dropdown
          ref="dropdownRef"
          v-model="dorpdown1"
          label="드롭다운"
          :options="options"
          required
          required-msg="옵션을 선택하세요"
        ></v-dropdown>
        <ul class="form__group-desc">
          <li class="is-guide">
            밤 12시부터 1일간 감지된 오프라인 상태 단말이 설정 건수 이상으로 누적될 시 알림을 발송합니다.
          </li>
        </ul>
      </div>

      <div class="form__group">
        <div class="form__field">
          <label class="v-textfield__label">가로형 라벨</label>
          <v-dropdown
            ref="dropdownRef"
            v-model="dorpdown1"
            :options="options"
            required
            required-msg="옵션을 선택하세요"
          ></v-dropdown>
        </div>
        <ul class="form__group-desc">
          <!-- 기본 -->
          <li>영문 대소문자, 숫자, 특수문자 혼합</li>
          <!-- 유효성 검사 실패 -->
          <li class="is-fail">영문 대소문자, 숫자, 특수문자 혼합</li>
          <!-- 유효성 검사 성공 -->
          <li class="is-success">영문 대소문자, 숫자, 특수문자 혼합</li>
        </ul>
      </div>

      <div class="form__group">
        <div class="form__field">
          <label class="v-textfield__label">가로형 라벨</label>
          <v-dropdown
            ref="dropdownRef"
            v-model="dorpdown1"
            :options="options"
            required
            required-msg="옵션을 선택하세요"
          ></v-dropdown>
        </div>
        <ul class="form__group-desc">
          <li class="is-guide">
            밤 12시부터 1일간 감지된 오프라인 상태 단말이 설정 건수 이상으로 누적될 시 알림을 발송합니다.
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style></style>
