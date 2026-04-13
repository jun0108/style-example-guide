<script lang="ts" setup>
const sampleData = ref();

onMounted(() => {
  setTimeout(() => {
    sampleData.value = [
      { date: '2026-01-01 00:00:00', temp: 26, hum: 66, type: '81' },
      { date: '2026-01-02 00:00:00', temp: 24, hum: 60, type: '81' },
      { date: '2026-01-03 00:00:00', temp: 27, hum: 62, type: '82' },
      { date: '2026-01-04 00:00:00', temp: 38, hum: 58, type: '81' },
      { date: '2026-01-05 00:00:00', temp: 52, hum: 57, type: '83' },
      { date: '2026-01-06 00:00:00', temp: 60, hum: 56, type: '81' },
      { date: '2026-01-07 00:00:00', temp: 58, hum: 59, type: '81' },
      { date: '2026-01-08 00:00:00', temp: 57, hum: 62, type: '81' },
      { date: '2026-01-09 00:00:00', temp: 59, hum: 60, type: '81' },
      { date: '2026-01-10 00:00:00', temp: 57, hum: 55, type: '81' },
    ];
  }, 10000);
});
</script>

<template>
  <div>
    <h1>차트</h1>

    <h2>Line</h2>
    <div class="w-full h-[350px] bg-gray-100">
      <cm-chart
        :x="{
          name: '날짜',
          key: 'date',
        }"
        :series="[{ name: '습도', key: 'hum', color: 'blue' }]"
        :data="sampleData"
      />
    </div>

    <h2>Bar</h2>
    <div class="w-full h-[350px] bg-gray-100">
      <cm-chart
        type="bar"
        :x="{
          name: '날짜',
          key: 'date',
        }"
        :series="[{ name: '온도', key: 'temp', color: 'red' }]"
        :data="sampleData"
      />
    </div>

    <h2>Pie</h2>
    <div class="w-full h-[400px] bg-gray-100">
      <cm-chart
        type="pie"
        :x="{
          name: '날짜',
          key: 'date',
        }"
        :series="[
          { name: '온도', key: 'temp', color: 'red' },
          { name: '습도', key: 'hum', color: 'blue' },
        ]"
        :data="sampleData"
      />
    </div>

    <h2>Donut</h2>
    <div class="w-full h-[400px] bg-gray-100">
      <cm-chart
        type="donut"
        :x="{
          name: '날짜',
          key: 'date',
        }"
        :series="[
          { name: '온도', key: 'temp', color: 'red' },
          { name: '습도', key: 'hum', color: 'blue' },
        ]"
        :data="sampleData"
      />
    </div>

    <h2>Half donut</h2>
    <div class="w-full h-[400px] bg-gray-100">
      <cm-chart
        type="half-donut"
        :x="{
          name: '날짜',
          key: 'date',
        }"
        :series="[
          { name: '온도', key: 'temp', color: 'red' },
          { name: '습도', key: 'hum', color: 'blue' },
        ]"
        :data="sampleData"
      />
    </div>
  </div>
</template>

<style></style>
