import LayoutGuide from '../layouts/guide/index.vue';

export default {
  path: '/guide',
  component: LayoutGuide,
  children: [
    { path: '', component: () => import('@/guides/index.vue') },
    // intpus
    { path: 'inputs/textfield', component: () => import('@/guides/inputs/GuideTextfield.vue') },
    { path: 'inputs/selector', component: () => import('@/guides/inputs/GuideSelector.vue') },
    { path: 'inputs/textarea', component: () => import('@/guides/inputs/GuideTextarea.vue') },
    { path: 'inputs/datepicker', component: () => import('@/guides/inputs/GuideDatepicker.vue') },
    { path: 'inputs/dropdown', component: () => import('@/guides/inputs/GuideDropdown.vue') },
    // components
    { path: 'component/button', component: () => import('@/guides/component/GuideButton.vue') },
    { path: 'component/token', component: () => import('@/guides/component/GuideToken.vue') },
    { path: 'component/icon', component: () => import('@/guides/component/GuideIcon.vue') },
    { path: 'component/tooltip', component: () => import('@/guides/component/GuideTooltip.vue') },
    { path: 'component/toggle', component: () => import('@/guides/component/GuideToggle.vue') },
    { path: 'component/tree', component: () => import('@/guides/component/GuideTree.vue') },
    { path: 'component/grid', component: () => import('@/guides/component/GuideGrid.vue') },
    { path: 'component/table', component: () => import('@/guides/component/GuideTable.vue') },
    { path: 'component/pagination', component: () => import('@/guides/component/GuidePagination.vue') },
    { path: 'component/timer', component: () => import('@/guides/component/GuideTimer.vue') },
    { path: 'component/colorpicker', component: () => import('@/guides/component/GuideColorpicker.vue') },
    { path: 'component/chart', component: () => import('@/guides/component/GuideChart.vue') },
    { path: 'component/map', component: () => import('@/guides/component/GuideMap.vue') },
    { path: 'component/tab', component: () => import('@/guides/component/GuideTab.vue') },
    { path: 'component/accordion', component: () => import('@/guides/component/GuideAccordion.vue') },
    { path: 'component/editor', component: () => import('@/guides/component/GuideEditor.vue') },
    { path: 'component/swipe-bottom-sheet', component: () => import('@/guides/component/GuideSwipeBottomSheet.vue') },
    { path: 'component/no-data', component: () => import('@/guides/component/GuideNoData.vue') },
    // composables
    { path: 'composable/validate', component: () => import('@/guides/composables/GuideValidate.vue') },
    { path: 'composable/modal', component: () => import('@/guides/composables/GuideModal.vue') },
    { path: 'composable/dialog', component: () => import('@/guides/composables/GuideDialog.vue') },
    { path: 'composable/noti', component: () => import('@/guides/composables/GuideNoti.vue') },
    // connections
    { path: 'connection/request', component: () => import('@/guides/connection/GuideRequest.vue') },
    { path: 'connection/com-api', component: () => import('@/guides/connection/GuideComApi.vue') },
    // publishing
    { path: 'pub/list', component: () => import('@/guides/pub/GuidePubList.vue') },
    // etc
    { path: 'etc/responsive', component: () => import('@/guides/etc/GuideResponsive.vue') },
    { path: 'etc/image-file', component: () => import('@/guides/etc/GuideImageFile.vue') },
  ],
};
