import env from './app.env';

import { createApp } from 'vue';
import { router } from './routing';
import { store } from './store';
import { setupAuth } from './auth';
import { setupThiscoveryResponse } from './store/task/setup';

import envPlugin from './plugins/environment';

import AppContainer from './domain/app/AppContainer';
import XButton from './components/button';
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

app.directive('click-outside', {
	beforeMount(el, binding, vnode) {
        const vm = vnode.context;
        const callback = binding.value;

        el.clickOutsideEvent = (event) => {
            if (!(el == event.target || el.contains(event.target))) {
                return callback.call(vm, event);
            }
        };

        document.body.addEventListener('click', el.clickOutsideEvent);
    },

    beforeUnmount(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
    },
});


app.component('AppContainer', AppContainer);
app.component('XButton', XButton);
app.component('Icon', Icon);
app.component('Placeholder', Placeholder);
app.component('IconText', IconText);
app.component('Tooltip', Tooltip);

app.use(envPlugin);
app.use(store);
app.use(router);
app.mount('#app');

setupApp();
