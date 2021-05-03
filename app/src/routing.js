import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import { authRouteGuard } from './auth';
import { taskInitGuard } from './store/task/guards';

export const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach(authRouteGuard);
router.beforeResolve(taskInitGuard);
