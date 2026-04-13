<script lang="ts" setup>
import DevStatusWidget from '@/pages/dashboard/widgets/DevStatusWidget.vue';
import DevOnOffWidget from '@/pages/dashboard/widgets/DevOnOffWidget.vue';
import ApprovalRequestWidget from '@/pages/dashboard/widgets/ApprovalRequestWidget.vue';
import WidgetItem from '@/pages/dashboard/widgets/WidgetItem.vue';
</script>

<template>
  <div>
    <h1>대시보드 위젯</h1>

    <h2>대시보드 위젯</h2>
    <div class="flex items-center flex-wrap gap-4">
      <!-- 단말 현황 -->
      <widget-item title="모델별 단말 현황">
        <dev-status-widget></dev-status-widget>
      </widget-item>

      <!-- 온오프라인 비율 -->
      <widget-item title="모델별 온/오프라인 비율">
        <dev-on-off-widget></dev-on-off-widget>
      </widget-item>

      <!-- 회원 가입 요청 -->
      <widget-item title="플랫폼 가입 요청 수">
        <approval-request-widget></approval-request-widget>
      </widget-item>
    </div>
  </div>
</template>

<style></style>
