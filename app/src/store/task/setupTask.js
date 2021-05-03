import { store } from '@/store';

export const setupTask = async () => {
    let taskId = null;

    if (window.location.search.includes('task=') && !taskId) {
        const parameters = new URLSearchParams(window.location.search);
        taskId = parameters.get('task');
    }

    if (sessionStorage.getItem('task_id') && !taskId) {
        taskId = sessionStorage.getItem('task_id');
    }

    if (taskId) {
        await store.dispatch('task/initalise', taskId);
    }
}
