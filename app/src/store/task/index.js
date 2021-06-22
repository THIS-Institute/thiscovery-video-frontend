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
		initalise: async ({ commit, dispatch }, responseId) => {
			const task = await getTask({
				responseId: responseId,
			});

			if (task) {
				sessionStorage.setItem('response_id', responseId);

				if (task.appointment) {
					dispatch('appointments/initExisting', task.appointment, { root: true });
				}

				if (task.interviewId) {
					commit('interviews/setId', task.interviewId, { root: true });
				}

				commit('setId', task.id);
				commit('user/setAnonUserId', task.anonUserId, { root: true });
				commit('user/setAnonUserTaskId', task.anonUserTaskId, { root: true });
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
