import { createApp } from 'vue';
import { router } from './routing';
import { store } from './store';

import EButton from './components/ui/Button.vue';
import Icon from './components/ui/Icon.vue';
import Placeholder from './components/ui/Placeholder.vue';
import IconText from './components/ui/IconText.vue';
import Tooltip from './components/ui/Tooltip.vue';

const RootComponent = {};

const app = createApp(RootComponent);

app.component('EButton', EButton);
app.component('Icon', Icon);
app.component('Placeholder', Placeholder);
app.component('IconText', IconText);
app.component('Tooltip', Tooltip);

app.use(router);
app.use(store);
app.mount('#app');
