import { store } from '@/store';
import { computed } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import { routes } from './routes';
import { authRouteGuard } from './auth';
import { taskInitGuard } from './store/task/guards';

export const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior(to, from, savedPosition) {
		const fromHistory = Boolean(savedPosition);
		const history = computed(() => store.state.app.routerHistory);

		(fromHistory && history.value.length > 0)
			? store.commit('app/cutHistory')
			: store.commit('app/setHistory', from);

		return { x: 0, y: 0 };
	},
});

router.beforeEach(authRouteGuard);
router.beforeEach(taskInitGuard);
