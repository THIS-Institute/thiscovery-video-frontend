import { createApp } from 'vue';
import { router } from './routing';
import { store } from './store';
import { setupAuth } from './auth';
import env from './app.env';

import EButton from './components/Button';
import Icon from './components/Icon';
import Placeholder from './components/Placeholder';
import IconText from './components/IconText';
import Tooltip from './components/Tooltip';

const RootComponent = {};

const app = createApp(RootComponent);

const callbackRedirect = (appState) => {
    console.log('here');
    router.push(
        appState && appState.targetUrl
            ? appState.targetUrl
            : '/'
    );
}

app.component('EButton', EButton);
app.component('Icon', Icon);
app.component('Placeholder', Placeholder);
app.component('IconText', IconText);
app.component('Tooltip', Tooltip);

app.use(store);

const authOptions = {
    domain: env.auth.domain,
    client_id: env.auth.clientId,
    redirect_uri: `${env.domain}/auth-return`,
};

setupAuth(authOptions, callbackRedirect)
    .then((auth) => app.use(auth))
    .finally(() => {
        app.use(router);
        app.mount('#app');
    });
