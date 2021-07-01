export const app = {
	namespaced: true,

	state: () => ({
		loading: false,
		modalActive: false,
		navActive: false,
		routerHistory: [],
		settings: {
			cameraEnabled: true,
			microphoneEnabled: true,
		},
	}),

	mutations: {
		toggleNav(state) {
			state.navActive = !state.navActive;
		},

		toggleModal(state) {
			state.modalActive = !state.modalActive;
		},

		setModalActive(state, active) {
			state.modalActive = active;
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
			state.settings.cameraEnabled = !state.settings.cameraEnabled;
		},

		toggleMicrophone(state) {
			state.settings.microphoneEnabled = !state.settings.microphoneEnabled;
		},
	},

	actions: {
		openModal: ({ commit }) => {
			commit('setModalActive', true);
		},

		closeModal: ({ commit }) => {
			commit('setModalActive', false);
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
