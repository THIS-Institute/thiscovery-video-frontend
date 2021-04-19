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
    loading: computed(() => store.state.user.isAuthLoading),
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
                targetUrl: to.fullPath,
            },
        });
    }

    if (!loading.value) {
        return verify();
    }

    // Watch for the loading property to change before we check isAuthenticated
    watchEffect(() => {
        if (loading.value === false) {
            return verify();
        }
    })
}

export const setupAuth = async (options) => {
    client = await createAuth0Client({
        ...options,
    });

    try {
        // If the user is returning to the app after authentication

        if (
            window.location.search.includes('code=')
            && window.location.search.includes('state=')
        ) {
            // handle the redirect and retrieve tokens
            const { appState } = await client.handleRedirectCallback();

            await store.commit('user/setAuthAppState', appState);

            // Notify subscribers that the redirect callback has happened, passing the appState
            // (useful for retrieving any pre-authentication state)
            callbackRedirect(appState);
        }
    } catch (exception) {
        store.commit('user/setAuthError', exception);
    } finally {
        // Initialize our internal authentication state
        const isAuthenticated = await client.isAuthenticated();
        const user = await client.getUser();

        store.commit('user/setIsAuthenticated', isAuthenticated);
        store.commit('user/setUser', user);
        store.commit('user/setIsAuthLoading', false);
    }

    return {
        install: (app) => {
            app.config.globalProperties.$auth = authPlugin
        },
    }
}
