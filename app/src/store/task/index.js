import { getTask } from '@/api/tasks';

export const task = {
	namespaced: true,

	state: () => ({
		initalised: false,
		id: null,
		onDemandAvailable: false,
		liveAvailable: false,
		title: null,
	}),

	mutations: {
		setInitalised(state, status) {
			state.initalised = status;
		},

		setId(state, id) {
			state.id = id;
		},

		setOnDemandAvailable(state, available) {
			state.onDemandAvailable = available;
		},

		setLiveAvailable(state, available) {
			state.liveAvailable = available;
		},

		setTitle(state, title) {
			state.title = title;
		},
	},

	actions: {
		initalise: async ({ commit, dispatch, rootState }, taskId) => {
			const userId = rootState.user.userId;

			const task = await getTask({
				taskId: taskId,
				userId: userId,
			});

			if (task) {
				sessionStorage.setItem('task_id', taskId);

				if (task.appointment) {
					dispatch('appointments/initExisting', task.appointment, { root: true });
				}

				commit('setId', task.id);
				commit('appointments/setBookingTypeId', task.acuityTypeId, { root: true });
				commit('setOnDemandAvailable', task.onDemandAvailable);
				commit('setLiveAvailable', task.liveAvailable);
				commit('setTitle', task.title);
				commit('setInitalised', true);
			}
		},
	},
};
