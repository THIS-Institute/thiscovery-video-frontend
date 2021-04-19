export const user = {
	namespaced: true,

	state: () => ({
		isAuthenticated: false,
		isAuthLoading: false,
		user: {},
		isInterviewer: false,
		authError: null,
		authAppState: null,
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
		setAuthAppState(state, returnState) {
			state.authAppState = returnState;
		},
	},

	getters: {
		hasUser (state) {
			if (!state.isAuthenticated) {
				return false;
			}

			if (state.user.name === undefined) {
				return false;
			}

			return true;
		},

		getIdentity (state) {
			if (state.user.name === undefined) {
				return null;
			}

			return state.user.name;
		},

		getInitials (state) {
			if (state.user.given_name === undefined || state.user.family_name === undefined) {
				return null;
			}

			const first = state.user.given_name
				.charAt(0)
				.toUpperCase();

			const last = state.user.family_name
				.charAt(0)
				.toUpperCase();
			
			return `${first}${last}`;
		},

		getGivenName (state) {
			if (state.user.given_name === undefined) {
				return null;
			}

			return state.user.given_name;
		},

		getAuthTargetUrl (state) {
			if (!state.authAppState) {
				return null;
			}

			if (!state.authAppState.targetUrl) {
				return null;
			}

			return state.authAppState.targetUrl;
		},
	},
};
