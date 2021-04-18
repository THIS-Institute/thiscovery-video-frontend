import { createApp } from 'vue';
import { router } from './routing';
import { store } from './store';
import { setupAuth } from './auth';
import env from './app.env';

import EButton from './components/Button.vue';
import Icon from './components/Icon.vue';
import Placeholder from './components/Placeholder.vue';
import IconText from './components/IconText.vue';
import Tooltip from './components/Tooltip.vue';

const RootComponent = {};

const app = createApp(RootComponent);

app.component('EButton', EButton);
app.component('Icon', Icon);
app.component('Placeholder', Placeholder);
app.component('IconText', IconText);
app.component('Tooltip', Tooltip);

const callbackRedirect = (appState) => {
    router.push(
        appState && appState.targetUrl
            ? appState.targetUrl
            : '/'
    );
}

app.use(router);
app.use(store);

const authOptions = {
    domain: env.auth.domain,
    client_id: env.auth.clientId,
    redirect_uri: `${env.domain}/`,
};

setupAuth(authOptions, callbackRedirect)
    .then((auth) => app.use(auth))
    .finally(() => app.mount('#app'));
