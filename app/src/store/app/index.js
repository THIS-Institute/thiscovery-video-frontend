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

		setIsAuthenticated(state, isAuthenticated) {
			state.isAuthenticated = isAuthenticated;
		},

		setIsAuthLoading(state, isAuthLoading) {
			state.isAuthLoading = isAuthLoading;
		},

		setUser(state, user) {
			state.user = user;
		},

		setAuthError(state, authError) {
			state.authError = authError;
		},
	},
};
