export const user = {
	namespaced: true,

	state: () => ({
		isAuthenticated: false,
		isAuthLoading: false,
		user: {},
		authError: null,
	}),

	mutations: {
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
	
	actions: {},
	getters: {},
};
