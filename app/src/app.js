import { createApp } from 'vue';
import { router } from '@/router';
import { store } from '@/store';

import EButton from './components/common/Button.vue';
import Icon from './components/common/Icon.vue';

const RootComponent = {};

const app = createApp(RootComponent);

app.component('EButton', EButton);
app.component('Icon', Icon);

app.use(router);
app.use(store);
app.mount('#app');
