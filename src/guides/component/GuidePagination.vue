<script lang="ts" setup>
const formData = ref({
  page: 1,
  total: 312313,
  size: 10,
});

function handleChangePage(page: number) {
  console.log(page);
}

function handleChangeSize(size: number) {
  console.log(size);
}
</script>

<template>
  <div>
    <h1>페이지네이션</h1>

    <div>
      <cm-pagination :total="formData.total" @change:page="handleChangePage" @change:size="handleChangeSize" />
    </div>
  </div>
</template>

<style></style>
