import { getTask } from '@/api/tasks';

export const task = {
	namespaced: true,

	state: () => ({
		initalised: false,
		id: null,
		onDemandAvailable: false,
		liveAvailable: false,
		title: null,
		completionUrl: null,
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

		setCompletionUrl(state, url) {
			state.completionUrl = url;
		},
	},

	actions: {
		initalise: async ({ commit, dispatch, rootState }, responseId) => {
			const userId = rootState.user.userId;

			const task = await getTask({
				taskId: responseId,
				userId: userId,
			});

			if (task) {
				sessionStorage.setItem('response_id', responseId);

				if (task.appointment) {
					dispatch('appointments/initExisting', task.appointment, { root: true });
				}

				commit('setId', task.id);
				commit('appointments/setBookingTypeId', task.acuityTypeId, { root: true });
				commit('setOnDemandAvailable', task.onDemandAvailable);
				commit('setLiveAvailable', task.liveAvailable);
				commit('setTitle', task.title);
				commit('setInitalised', true);
				commit('setCompletionUrl', task.completionUrl);
			}
		},
	},

	getters: {
		isLiveAvailable (state) {
			return state.liveAvailable;
		},

		isOnDemandAvailable (state) {
			if (!window.MediaRecorder) {
				return false;
			}

			return state.onDemandAvailable;
		},
	}
};
