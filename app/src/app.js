import env from './app.env';

import { createApp } from 'vue';
import { router } from './routing';
import { store } from './store';
import { setupAuth } from './auth';
import { setupThiscoveryResponse } from './store/task/setup';

import AppContainer from './domain/app/AppContainer';
import EButton from './components/Button';
import Icon from './components/Icon';
import Placeholder from './components/Placeholder';
import IconText from './components/IconText';
import Tooltip from './components/Tooltip';

const RootComponent = {};

const setupApp = async () => {
    store.commit('app/setLoading', true);

    await setupAuth({
        domain: env.auth.domain,
        client_id: env.auth.clientId,
        redirect_uri: `${env.domain}/auth-return`,
    });
    
    await setupThiscoveryResponse();
    
    store.commit('app/setLoading', false);
};

const app = createApp(RootComponent);

app.component('AppContainer', AppContainer);
app.component('EButton', EButton);
app.component('Icon', Icon);
app.component('Placeholder', Placeholder);
app.component('IconText', IconText);
app.component('Tooltip', Tooltip);

app.use(store);
app.use(router);
app.mount('#app');

setupApp();
