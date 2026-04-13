<script lang="ts" setup>
const termsRef = ref();

function open() {
  termsRef.value.open();
}

function close() {
  termsRef.value.close();
}
</script>

<template>
  <div>
    <h1>아코디언</h1>

    <div class="flex gap-2 mb-4">
      <button class="g-btn--line" @click="open">Open</button>
      <button class="g-btn--line" @click="close">Close</button>
    </div>

    <cm-accordion ref="termsRef">
      <template #header> <span class="text-red-600">[필수]</span> 서비스 이용약관</template>

      <div class="terms-sample">
        <h3>무선 플랫폼 서비스 이용약관</h3>
        <p>제1장 총칙</p>
        <p>
          제1조 (목적)<br />
          본 약관(이하 ‘본 약관’)은 주식회사 LG유플러스(이하 ‘회사’)가 운영하는 무선 플랫폼 서비스(이하 ‘서비스’)를
          이용함에 있어 필요한 그 이용조건 및 절차에 관한 사항을 정함을 목적으로 합니다.
        </p>
        <p>제2조 (용어의 정의)<br />본 약관에서 사용하는 용어의 정의는 다음 각 호와 같습니다.</p>
        <ul>
          <li>
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem
            placerat. In id cursus mi pretium tellus duis convallis.
          </li>
          <li>
            Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
          </li>
          <li>
            Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti
            sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
          </li>
        </ul>
      </div>
    </cm-accordion>
  </div>
</template>

<style lang="scss" scoped>
.terms-sample {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  h3 {
    font-size: 1rem;
    color: #1a1919;
    margin-bottom: 1rem;
  }
  p {
  }
}
</style>
