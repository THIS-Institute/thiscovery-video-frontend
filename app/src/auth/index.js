import createAuth0Client from '@auth0/auth0-spa-js';
import { computed, watchEffect } from 'vue';
import { store } from '@/store';

let client;

async function handleRedirectCallback() {
    store.commit('user/setIsAuthLoading', true);

    try {
        await client.handleRedirectCallback()
        const user = await client.getUser();

        store.commit('user/setUser', user);
        store.commit('user/setIsAuthenticated', true);
    } catch (exception) {
        store.commit('user/setAuthError', exception);
    } finally {
        store.commit('user/setIsAuthLoading', false);
    }
}

function loginWithRedirect(options) {
    return client.loginWithRedirect(options);
}

function getIdTokenClaims(options) {
    return client.getIdTokenClaims(options);
}

function getTokenSilently(options) {
    return client.getTokenSilently(options);
}

function logout(options) {
    return client.logout(options);
}

const authPlugin = {
    isAuthenticated: computed(() => store.state.user.isAuthenticated),
    loading: computed(() => store.state.app.loading),
    user: computed(() => store.state.user.user),
    getIdTokenClaims,
    getTokenSilently,
    handleRedirectCallback,
    loginWithRedirect,
    logout,
}

export const authRouteGuard = (to, from, next) => {
    const {
        isAuthenticated,
        loading,
        loginWithRedirect
    } = authPlugin;

    const verify = () => {
        if (isAuthenticated.value) {
            return next();
        }
        
        loginWithRedirect({
            appState: {
                fullUrl: window.location.href,
                targetUrl: to.fullPath,
            },
        });
    }

    if (!loading.value) {
        return verify();
    }

    watchEffect(() => {
        if (!loading.value) {
            return verify();
        }
    });
}

export const setupAuth = async (options) => {
    client = await createAuth0Client({
        ...options,
    });

    if (
        window.location.search.includes('code=')
        && window.location.search.includes('state=')
    ) {
        try {
            const { appState } = await client.handleRedirectCallback();
            await store.commit('user/setAuthAppState', appState);
        } catch (exception) {
            store.commit('user/setAuthError', exception);
        } finally {
            const isAuthenticated = await client.isAuthenticated();
            const user = await client.getUser();

            store.dispatch('user/authenticate', {
                isAuthenticated: isAuthenticated,
                user: user,
            });
        }
    }
}
