import { createStore } from 'vuex';
import { app } from './app';
import { task } from './task';
import { appointments } from './appointments';
import { user } from './user';
import { interviews } from './interviews';

export const store = createStore({
	modules: {
		app,
		task,
		appointments,
		user,
		interviews,
	},
});
