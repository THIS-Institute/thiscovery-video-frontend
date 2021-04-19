import { createStore } from 'vuex';
import { app } from './app';
import { task } from './task';
import { appointments } from './appointments';
import { user } from './user';
import { interviews } from './interviews';

const interviewerStatusListener = (store) => {
	let params = new URLSearchParams(window.location.search);

	if (params.has('isInterviewer')) {
		if (params.get('isInterviewer') === 'false') {
			store.commit('user/setInterviewerStatus', false);
		} else {
			store.commit('user/setInterviewerStatus', true);
		}
	}
}

export const store = createStore({
	modules: {
		app,
		task,
		appointments,
		user,
		interviews,
	},
	plugins: [
		interviewerStatusListener,
	],
});
