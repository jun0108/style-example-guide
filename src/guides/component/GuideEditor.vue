<script lang="ts" setup>
const EXAMPLE_CONTENT = `<h1><span style="color: rgb(171, 70, 66);">제1장 총칙</span></h1><h4><span style="color: rgb(88, 88, 88);">1. 총칙</span></h4><ul><li><p><span style="color: rgb(88, 88, 88);">개인정보란 살아 있는 개인에 관한 정보로서 다음 각호의 어느 하나에 해당하는 정보를 의미합니다.</span></p><p><span style="color: rgb(88, 88, 88);">1) 성명, 주민등록번호 및 영상 등에 의하여 특정한 개인을 알아볼 수 있는 정보</span></p><p><span style="color: rgb(88, 88, 88);">2) 해당 정보만으로는 특정 개인을 알아볼 수 없어도 다른 정보와 쉽게 결합하여 알아볼 수 있는 정보</span></p><p><span style="color: rgb(88, 88, 88);">3) 가명 처리함으로써 원래의 상태로 복원하기 위한 추가 정보의 사용·결합 없이는 특정 개인을 알아볼 수 없는 정보(이하 '가명정보')</span></p></li><li><p><span style="color: rgb(88, 88, 88);">회사는 개인정보처리방침을 통하여 고객의 개인정보가 어떤 용도와 방식으로 이용되고 있으며 개인정보 보호를 위하여 어떤 조치가 취해지고 있는지 알려드립니다.</span></p></li><li><p><span style="color: rgb(88, 88, 88);">회사는 개인정보처리방침을 홈페이지(</span><a href="https://www.lguplus.com"><span style="color: rgb(88, 88, 88);">https://www.lguplus.com</span></a><span style="color: rgb(88, 88, 88);">) 첫 화면에 공개함으로써 고객이 언제나 쉽게 보고 확인할 수 있도록 조치하고 있습니다.</span></p></li><li><p><span style="color: rgb(88, 88, 88);">회사는 개인정보처리방침을 관련 법령 또는 내부 운영규정의 변경에 따라 개정할 수 있으며, 개인정보처리방침을 개정하는 경우 버전번호 등을 부여하여 개정된 사항을 고객이 쉽게 알아볼 수 있도록 하고 있습니다.</span></p></li></ul><h4><span style="color: rgb(88, 88, 88);">2. 개인정보의 처리 목적, 수집 항목, 보유 및 이용 기간</span></h4><ul><li><p><span style="color: rgb(88, 88, 88);">회사는 고객님의 개인정보를 처리하는 경우 관련 법령에 따라 개인정보 처리방침 또는 개인정보 수집·이용 동의서 등을 통하여 그 수집 목적, 수집 항목 및 보유 및 이용기간을 사전에 고지합니다.</span></p></li><li><p><span style="color: rgb(88, 88, 88);">회사는 다음 각 호의 어느 하나에 해당하는 경우에 고객님의 개인정보를 수집할 수 있으며, 그 수집 목적의 범위에서 이용할 수 있습니다.</span></p><p><span style="color: rgb(88, 88, 88);">1) 고객님의 동의를 받는 경우</span></p><p><span style="color: rgb(88, 88, 88);">2) 법률에 특별한 규정이 있거나 법령상 의무를 준수하기 위하여 불가피한 경우</span></p><p><span style="color: rgb(88, 88, 88);">3) 고객님과 체결한 계약을 이행하거나 계약을 체결하는 과정에서 고객님 요청에 따른 조치를 이행하기 위하여 필요한 경우</span></p><p><span style="color: rgb(88, 88, 88);">4) 명백히 고객님 또는 제3자의 급박한 생명, 신체, 재산의 이익을 위하여 필요하다고 인정되는 경우</span></p><p><span style="color: rgb(88, 88, 88);">5) 회사의 정당한 이익을 달성하기 위하여 필요한 경우로서 명백하게 고객님 권리보다 우선하는 경우</span></p><p><span style="color: rgb(88, 88, 88);">6) 공중위생 등 공공의 안정과 안녕을 위하여 긴급히 필요한 경우</span></p></li><li><p><span style="color: rgb(88, 88, 88);">회사는 다음의 개인정보 항목을 고객님의 동의를 받아 처리하고 있습니다.</span></p></li></ul>`;

const content = ref('');

const editorRef = ref();

// 컨텐츠 가져오기
function getContent() {
  content.value = editorRef.value.getContent();
}

// 컨텐츠 설정
function setContent() {
  editorRef.value.setContent(EXAMPLE_CONTENT);
}

// 컨텐츠 초기화
function clearContent() {
  editorRef.value.clearContent();
}
</script>

<template>
  <div>
    <h1>에디터</h1>

    <h2>Editor</h2>
    <div class="flex gap-2 mb-4">
      <button class="g-btn--line" @click="getContent">get Content</button>
      <button class="g-btn--line" @click="setContent">set Content</button>
      <button class="g-btn--line" @click="clearContent">clear Content</button>
    </div>
    <!-- 에디터 -->
    <cm-editor ref="editorRef" />
    <!-- // 에디터 -->

    <h2>Viewer</h2>
    <div class="border-1 border-[#ddd] rounded-sm py-2 px-4">
      <div class="toastui-editor-contents" v-html="content"></div>
    </div>
  </div>
</template>

<style>
@media screen and (max-width: 480px) {
  .toastui-editor-popup {
    left: 180px !important;
  }
  .toastui-editor-tooltip {
    display: none !important;
  }
}
</style>
