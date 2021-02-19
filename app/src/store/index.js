import { createStore } from 'vuex';
import { app } from './app';
import { task } from './task';
import { user } from './user';
import { interviews } from './interviews';

const deviceEventListener = (store) => {
	navigator.mediaDevices.ondevicechange = () => {
		store.dispatch('interviews/updateMediaDevices');
	};
}

export const store = createStore({
	modules: {
		app,
		task,
		user,
		interviews,
	},
	plugins: [
		deviceEventListener,
	],
});
