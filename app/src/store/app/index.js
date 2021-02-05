export const app = {
	namespaced: true,

	state: () => ({
		navActive: false,
		nav: [
			{
				title: 'Home',
				url: '/',
			},
			{
				title: 'About',
				url: '/about',
			},
			{
				title: 'Contact us',
				url: '/contact-us',
			},
		],
	}),

	mutations: {
		toggle(state) {
			state.navActive = !state.navActive;
		},
	},

	actions: {},
	getters: {},
};
