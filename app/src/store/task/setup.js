import { store } from '@/store';

export const setupThiscoveryResponse = async () => {
    let responseId = null;

    if (window.location.search.includes('response_id=') && !responseId) {
        const parameters = new URLSearchParams(window.location.search);
        responseId = parameters.get('response_id');
    } else if (sessionStorage.getItem('response_id') && !responseId) {
        responseId = sessionStorage.getItem('response_id');
    }

    if (responseId) {
        await store.dispatch('task/initalise', responseId);
    }
}
