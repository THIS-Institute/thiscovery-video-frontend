export const app = {
	namespaced: true,

	state: () => ({
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
	},
};
