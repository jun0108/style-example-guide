<script lang="ts" setup>
const modal = useModal();

function openModal() {
  modal.open({
    component: () => import('@/guides/composables/components/SampleModal.vue'),
    options: {
      width: 'md',
    },
    bind: {
      bindKey: 'Binded value is ' + new Date().getTime(),
    },
    on: {
      refresh: () => {
        openModal2();
      },
    },
  });
}

function openModal2() {
  modal.open({
    component: () => import('@/guides/composables/components/SampleModal2.vue'),
    options: {},
    bind: {
      bindKey: 'Binded value for second popup is ' + new Date().getTime(),
    },
    on: {
      refresh: () => {
        console.log('refresh');
      },
    },
  });
}

function openModalSm() {
  modal.open({
    component: () => import('@/guides/composables/components/SampleModal2.vue'),
    options: {
      width: 'sm',
    },
    bind: {},
    on: {},
  });
}

function openModalMd() {
  modal.open({
    component: () => import('@/guides/composables/components/SampleModal2.vue'),
    options: {
      width: 'md',
    },
    bind: {},
    on: {},
  });
}

function openModalLg() {
  modal.open({
    component: () => import('@/guides/composables/components/SampleModal2.vue'),
    options: {
      width: 'lg',
    },
    bind: {},
    on: {},
  });
}

function openModalXl() {
  modal.open({
    component: () => import('@/guides/composables/components/SampleModal2.vue'),
    options: {
      width: 'xl',
    },
    bind: {},
    on: {},
  });
}

function openModalCustom() {
  modal.open({
    component: () => import('@/guides/composables/components/SampleModal2.vue'),
    options: {
      width: '450px',
      height: '400px',
    },
    bind: {},
    on: {},
  });
}

function openCaseClose() {
  modal.open({
    component: () => import('@/guides/composables/components/SampleModal2.vue'),
    options: {
      useOutsideClick: true,
    },
    bind: {},
    on: {},
  });
}
</script>

<template>
  <div>
    <h1>모달 팝업</h1>

    <h2>기본</h2>
    <div class="flex gap-2">
      <button class="g-btn--line" @click="openModal">Modal</button>
    </div>

    <h2>사이즈</h2>
    <div class="flex gap-2">
      <button class="g-btn--line" @click="openModalSm">Small</button>
      <button class="g-btn--line" @click="openModalMd">Medium</button>
      <button class="g-btn--line" @click="openModalLg">Large</button>
      <button class="g-btn--line" @click="openModalLg">XL</button>
      <button class="g-btn--line" @click="openModalCustom">Custom</button>
    </div>

    <h2>기타</h2>
    <div class="flex gap-2">
      <button class="g-btn--line" @click="openCaseClose">닫기</button>
    </div>
  </div>
</template>

<style></style>
