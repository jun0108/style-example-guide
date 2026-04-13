import { createApp } from 'vue';
import App from './App.vue';

import router from './routers';

// styles
import '@/assets/styles/index.scss';

const app = createApp(App);

app.use(router);
app.mount('#app');
