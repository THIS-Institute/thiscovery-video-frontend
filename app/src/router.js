import { createRouter, createWebHistory } from 'vue-router';

import PathSelectionView from './views/PathSelectionView';

const routes = [
    { path: '/', component: PathSelectionView },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
