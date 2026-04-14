import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';

import router from './routers';

// styles
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '@/assets/styles/index.scss';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.mount('#app');
