<script lang="ts" setup>
type UserInfoRes = {
  date: string;
  msg: string;
  result: string;
};

const result: any = ref('');

async function postData() {
  try {
    const response = await request.post<RequestResponse<UserInfoRes>>({
      url: '/sample/client',
      xMid: 'P000000',
      data: {
        date: new Date().getTime(),
        msg: Math.random().toString(32).substring(7),
      },
    });
    result.value = response.data;
  } catch (e) {
    console.error(e);
  }
}
</script>

<template>
  <div>
    <h1>Http Request</h1>

    <div>
      <button class="g-btn--line" @click="postData">POST</button>
    </div>
    <blockquote>
      {{ result }}
    </blockquote>
  </div>
</template>

<style></style>
