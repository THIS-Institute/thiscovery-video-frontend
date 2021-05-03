import { store } from '@/store';

export const taskInitGuard = (to) => {
    if (to.meta.requiresTaskInit 
        && !store.state.task.initalised) {
        return false;
    }
}
