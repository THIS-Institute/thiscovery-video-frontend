import { createApp } from 'vue';
import { router } from './core/routing';
import { store } from './store';

import EButton from './components/common/Button.vue';
import Icon from './components/common/Icon.vue';
import Placeholder from './components/common/Placeholder.vue';

const RootComponent = {};

const app = createApp(RootComponent);

app.component('EButton', EButton);
app.component('Icon', Icon);
app.component('Placeholder', Placeholder);

app.use(router);
app.use(store);
app.mount('#app');
