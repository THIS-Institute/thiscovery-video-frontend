import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
// import { authRouteGuard } from './auth';

export const router = createRouter({
	history: createWebHistory(),
	routes,
});

// router.beforeEach(authRouteGuard);
