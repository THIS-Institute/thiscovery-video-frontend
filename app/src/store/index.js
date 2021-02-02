import { createStore } from 'vuex';
import { app } from './app';
import { task } from './task';
import { user } from './user';

export const store = createStore({
    modules: {
        app,
        task,
        user,
    },
});
