<script lang="ts" setup>
import Header from '@/components/layout/Header.vue';
import Lnb from '@/components/layout/Lnb.vue';

</script>

<template>
  <div class="layout-default">
    <Header />
    <div class="layout-default__main">
      <Lnb />
      <div class="layout-default__main-inner">
        <RouterView />
      </div>
    </div>
  </div>
</template>
