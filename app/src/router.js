import { createRouter, createWebHistory } from 'vue-router';

import PathSelectionView from './views/PathSelectionView';

const routes = [
    { path: '/', component: PathSelectionView },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
