<script lang="ts" setup>
const started = ref<boolean>(false);

const timerRef = ref();

function start() {
  timerRef.value.start();
  started.value = true;
}

function stop() {
  timerRef.value.stop();
  started.value = false;
}

function reset() {
  started.value = false;
  timerRef.value.reset();
}

function handleExpired() {
  started.value = false;
  console.log('expired timer');
}
</script>

<template>
  <div>
    <h1>타이머</h1>
    <div class="mb-2 flex gap-2">
      <button class="g-btn--line g-btn--sm" :disabled="started" @click="start">Start</button>
      <button class="g-btn--line g-btn--sm" :disabled="!started" @click="stop">Stop</button>
      <button class="g-btn--line g-btn--sm" @click="reset">Reset</button>
    </div>
    <div class="mb-4">
      <cm-timer ref="timerRef" :limit="10" @expired="handleExpired" />
    </div>
  </div>
</template>

<style></style>
