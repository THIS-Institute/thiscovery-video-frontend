import { createApp } from 'vue';
import { router } from '@/router';
import { store } from '@/store';

const RootComponent = {};

const app = createApp(RootComponent);

app.use(router);
app.use(store);
app.mount('#app');
