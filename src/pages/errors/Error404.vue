<script lang="ts" setup>
const router = useRouter();

function goPrev() {
  router.back();
}
</script>

<template>
  <div class="__exception">
    <i class="__exception__icon"></i>
    <p class="__exception__title">요청하신 페이지를 찾을 수 없습니다.</p>
    <p class="__exception__desc">입력하신 페이지의 주소가 정확한지 다시 한번 확인해 주세요.</p>
    <cm-button variant="primary" size="lg" @click="goPrev">이전 페이지로 이동</cm-button>
  </div>
</template>

<style lang="scss" scoped>
.__exception {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100dvw;
  height: 100dvh;
  gap: 1rem;
  &__icon {
    width: 75px;
    height: 75px;
    &::after {
      background-color: var(--color-icon-disabled);
      content: '';
      display: inline-block;
      width: 100%;
      height: 100%;
      mask-repeat: no-repeat;
      mask-size: 100% 100%;
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='currentColor' d='M2.725 21q-.275 0-.5-.137t-.35-.363t-.137-.488t.137-.512l9.25-16q.15-.25.388-.375T12 3t.488.125t.387.375l9.25 16q.15.25.138.513t-.138.487t-.35.363t-.5.137zm1.725-2h15.1L12 6zm8.263-1.287Q13 17.425 13 17t-.288-.712T12 16t-.712.288T11 17t.288.713T12 18t.713-.288m0-3Q13 14.425 13 14v-3q0-.425-.288-.712T12 10t-.712.288T11 11v3q0 .425.288.713T12 15t.713-.288M12 12.5'/%3E%3C/svg%3E");
    }
  }
  &__title {
    color: var(--color-font-main);
    line-height: var(--typo-headline-h4-lh);
    font-size: var(--typo-headline-h4-size);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--letter-spacing-default);
  }
  &__desc {
    line-height: var(--typo-headline-h6-lh);
    font-size: var(--typo-headline-h6-size);
    font-weight: var(--font-weight-regular);
    letter-spacing: var(--letter-spacing-default);
    color: var(--nodata-text-color);
  }
}
</style>
