export const app = {
	namespaced: true,

	state: () => ({
		loading: false,
		modalActive: false,
		navActive: false,
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
	},

	actions: {
		openModal: ({ commit }) => {
			commit('setModalActive', true);
		},

		closeModal: ({ commit }) => {
			commit('setModalActive', false);
		},
	},
}
