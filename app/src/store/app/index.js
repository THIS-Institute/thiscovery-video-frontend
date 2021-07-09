export const app = {
	namespaced: true,

	state: () => ({
		loading: false,
		modal: {},
		navActive: false,
		routerHistory: [],
		settings: {
			audio: true,
			video: true,
		},
	}),

	mutations: {
		toggleNav(state) {
			state.navActive = !state.navActive;
		},

		setModal(state, options) {
			state.modal = options;
		},

		setLoading(state, loading) {
			state.loading = loading;
		},

		cutHistory(state) {
			state.routerHistory.splice(-1, 1);
		},

		setHistory(state, from) {
			state.routerHistory.push(from);
		},

		toggleCamera(state) {
			state.settings.video = !state.settings.video;
		},

		toggleMicrophone(state) {
			state.settings.audio = !state.settings.audio;
		},
	},

	actions: {
		openModal: ({ commit }, payload) => {
			commit('setModal', payload);
		},

		closeModal: ({ commit }) => {
			commit('setModal', {});
		},
	},

	getters: {
		getPreviousRoute (state) {
			const historyLength = state.routerHistory.length;

			if (historyLength === 0) return null;

			return state.routerHistory[historyLength - 1];
		},

		getSettings(state) {
			return state.settings;
		},
	},
}
