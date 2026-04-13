<script lang="ts" setup>

</script>

<template>
  <div>
    <h1>No Data</h1>

    <h2>Default</h2>
    <blockquote>
      height prop으로 높이 수정 가능 <br/>
      기본 100%
    </blockquote>
    <cm-no-data />
    
    <h2>Custom</h2>
    <blockquote>
      custom prop으로 메시지 수정 가능
    </blockquote>
    <cm-no-data height="270px" custom>
      <p>식별번호(CTN),모델명, 가입번호 중</p>
      <p>하나를 검색해 단말 위치를 확인할 수 있습니다.</p>
    </cm-no-data>
  </div>
</template>

<style></style>
