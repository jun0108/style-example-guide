<script lang="ts" setup>
import Header from '@/components/layout/Header.vue';
import Lnb from '@/components/layout/Lnb.vue';
</script>

<template>
  <div class="layout-login">
    <Header class="is-short" />
    <main class="layout-login__main">
      <Lnb class="is-short" />
      <div class="layout-login__main-inner">
        <RouterView />
      </div>
    </main>
  </div>
</template>
