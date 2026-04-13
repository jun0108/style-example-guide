<script lang="ts" setup>
const image = useImage();

const publicImage = ref();
const custImage = ref();

// 파일 다운로드
function downloadFile() {
  request.download({
    url: '/com/file/download/map/1/2026/03/11/1773195233707728-1425733586.png',
    xMid: 'P10000',
    data: {},
  });
}

onMounted(async () => {
  publicImage.value = await image.fetchPublicImageAsUrl('/cust/2026/03/06/177275952232743792025731595.png');
  custImage.value = await image.fetchImageAsUrl('/map/1/2026/03/11/1773195233707728-1425733586.png');
});

onBeforeUnmount(() => {
  image.releaseImageUrl(publicImage.value);
  image.releaseImageUrl(custImage.value);
});
</script>

<template>
  <div>
    <h1>업로드 이미지 및 파일</h1>
    <h2>공개 이미지</h2>
    <div>
      <img :src="publicImage" />
    </div>
    <h2>고객사 이미지</h2>
    <div>
      <img :src="custImage" />
    </div>
    <h2>파일 다운로드</h2>
    <div>
      <button class="g-btn--line" @click="downloadFile">파일 다운로드</button>
    </div>
  </div>
</template>

<style></style>
