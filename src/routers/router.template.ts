import LayoutDefault from '@/layouts/default/index.vue';

export default {
  path: '',
  component: LayoutDefault,
  children: [
    { path: '/guide/pub/list-template', component: () => import('@/guides/pub/GuidePubListTemplate.vue') },
    { path: '/guide/pub/split-template', component: () => import('@/guides/pub/GuidePubSplitTemplate.vue') },
    { path: '/guide/pub/stack-template', component: () => import('@/guides/pub/GuidePubStackTemplate.vue') },
  ],
};
