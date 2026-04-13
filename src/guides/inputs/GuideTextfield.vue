<script lang="ts" setup>
const textDisabled = ref('융합서비스팀');

const textfieldRef = ref();

function setValidMsg() {
  textfieldRef.value.setValidMsg('* 사용 가능한 아이디입니다.');
}

function clearValidMsg() {
  textfieldRef.value.clearValidMsg();
}

function setInvalidMsg() {
  textfieldRef.value.setInvalidMsg('사용할 수 없는 아이디입니다.');
}

function clearInvalidMsg() {
  textfieldRef.value.clearInvalidMsg();
}

function validateData() {
  console.log(textfieldRef.value.validate());
}

const started = ref<boolean>(false);

function handleExpired() {
  started.value = false;
}
</script>

<template>
  <div>
    <h1>Textfield</h1>
    <h2>기본</h2>
    <div class="grid grid-cols-3 gap-3">
      <v-textfield label="이름" required />
      <v-textfield label="전화번호" placeholder="'-'를 빼고 입력해 주세요" />
      <v-textfield label="아이디" clearable input-format="engNumber" />
      <v-textfield label="비밀번호" type="password" />
      <v-textfield v-model="textDisabled" label="부서" disabled />
      <v-textfield v-model="textDisabled" label="초기화 버튼" clearable />
      <v-textfield v-model="textDisabled" label="검색 버튼" type="search" />
    </div>

    <h2>사이즈</h2>
    <div class="grid grid-cols-3 gap-3">
      <v-textfield label="sm(40px)" class="size--sm" />
      <v-textfield label="default(44px)" />
      <v-textfield label="lg(48px)" class="size--lg" placeholder="'-'를 빼고 입력해 주세요" />
      <v-textfield label="xl(56px)" class="size--xl" />
    </div>

    <h2>가로형태의 라벨</h2>
    <div class="grid grid-cols-3 gap-3">
      <div class="form__field">
        <label class="v-textfield__label size--sm">sm(40px)</label>
        <v-textfield class="size--sm" />
      </div>
      <div class="form__field">
        <label class="v-textfield__label"> default(44px) </label>
        <v-textfield />
      </div>
      <div class="form__field">
        <label class="v-textfield__label size--lg required">required</label>
        <v-textfield class="size--lg" />
      </div>
      <div class="form__field">
        <label class="v-textfield__label size--xl">xl(56px)</label>
        <v-textfield class="size--xl" />
      </div>
    </div>

    <h2>variation</h2>
    <div class="grid grid-cols-1 gap-3">
      <div class="form__field">
        <v-textfield />
        <button type="button" class="cm-button cm-button--primary cm-button--md">버튼</button>
      </div>

      <div class="form__field">
        <div class="form__field__control">
          <v-textfield label="버튼 세로형" />
          <button type="button" class="cm-button cm-button--primary cm-button--md">버튼</button>
        </div>
      </div>

      <div class="form__field">
        <label class="v-textfield__label required">버튼 가로형</label>
        <div class="form__field__control">
          <v-textfield />
          <button type="button" class="cm-button cm-button--primary cm-button--md">버튼</button>
        </div>
      </div>

      <div class="form__field is-timer">
        <div class="form__field__control">
          <div class="form__field__control-timer">
            <v-textfield v-model="textDisabled" label="타이머" class="size--lg" clearable />
            <cm-timer ref="timerRef" :limit="10" class="is-label" @expired="handleExpired" />
          </div>
          <button type="button" class="cm-button cm-button--primary cm-button--lg">버튼</button>
        </div>
      </div>

      <div class="form__field is-timer">
        <div class="form__field__control-timer">
          <v-textfield v-model="textDisabled" class="size--lg" clearable />
          <cm-timer ref="timerRef" :limit="10" @expired="handleExpired" />
        </div>
        <button type="button" class="cm-button cm-button--primary cm-button--lg">버튼</button>
      </div>
    </div>

    <h2>메시지 설정</h2>
    <div class="grid grid-cols-1 gap-8">
      <div class="form__group">
        <v-textfield label="커스텀 validation" />
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
        <v-textfield label="안내 문구" />
        <ul class="form__group-desc">
          <li class="is-guide">
            밤 12시부터 1일간 감지된 오프라인 상태 단말이 설정 건수 이상으로 누적될 시 알림을 발송합니다.
          </li>
        </ul>
      </div>

      <div class="form__group">
        <div class="form__field">
          <label class="v-textfield__label">가로형 라벨</label>
          <v-textfield />
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
          <v-textfield />
        </div>
        <ul class="form__group-desc">
          <li class="is-guide">
            밤 12시부터 1일간 감지된 오프라인 상태 단말이 설정 건수 이상으로 누적될 시 알림을 발송합니다.
          </li>
        </ul>
      </div>
    </div>

    <h2>메시지 설정 테스트</h2>
    <div class="flex flex-col gap-4">
      <div class="flex gap-2">
        <button class="g-btn--line" @click="setValidMsg">검증 성공 메시지 설정</button>
        <button class="g-btn--line" @click="clearValidMsg">검증 성공 메시지 초기화</button>
        <button class="g-btn--line" @click="setInvalidMsg">검증 오류 메시지 설정</button>
        <button class="g-btn--line" @click="clearInvalidMsg">검증 오류 메시지 초기화</button>
        <button class="g-btn--line" @click="validateData">검증</button>
      </div>
      <div class="grid grid-cols-3 gap-3">
        <v-textfield ref="textfieldRef" label="아이디" />
      </div>
    </div>
  </div>
</template>

<style></style>
