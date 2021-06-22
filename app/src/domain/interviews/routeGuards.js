import { computed } from 'vue';
import { store } from '@/store';
import { ROUTE_LIVE_LANDING } from '@/routeConstants';

export const hasRoomTokenGuard = (to, from, next) => {
    const token = computed(() => store.state.interviews.token);
    
    if (!token.value) {
        return next({ name: ROUTE_LIVE_LANDING, params: to.params});
    }

    return next();
}

