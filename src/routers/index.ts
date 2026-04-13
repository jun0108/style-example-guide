import { createWebHistory, createRouter } from 'vue-router';

import LayoutDefault from '@/layouts/default/index.vue';

import Home from '@/pages/home/index.vue';
import Login from '@/pages/login/index.vue';
import Error404 from '@/pages/errors/Error404.vue';
import Error500 from '@/pages/errors/Error500.vue';

// modules
import routerGuide from './router.guide';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      component: LayoutDefault,
      children: [
        { path: '', name: 'Home', component: Home },
        { path: '/login', component: Login },
      ],
    },
    routerGuide,
    { path: '/not-found', name: 'NotFound', component: Error404, meta: { requireAuth: false } },
    { path: '/500', name: 'ServiceError', component: Error500, meta: { requireAuth: false } },
    { path: '/:pathMatch(.*)*', redirect: '/not-found' },
  ],
});

router.afterEach(() => {
  window.$modal?.closeAll();
});

export default router;
