import { computed, watchEffect } from 'vue';
import { store } from '@/store';
import { ROUTE_NO_TASK } from '@/routeConstants';

export const taskInitGuard = (to, from, next) => {
    const appLoading = computed(() => store.state.app.loading);
    const taskInitialised = computed(() => store.state.task.initalised);

    const check = () => {
        if (to.meta.requiresTaskInit && taskInitialised.value === false) {
            return next({ name: ROUTE_NO_TASK });
        }

        return next();
    }

    if (!appLoading.value) {
        return check();
    }

    watchEffect(() => {
        if (!appLoading.value) {
            return check();
        }
    });
}
