import { createApp } from 'vue';
import router from '@/router';

const RootComponent = {};

const app = createApp(RootComponent);

app.use(router);
app.mount('#app');
