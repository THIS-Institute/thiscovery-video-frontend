export const app = {
	namespaced: true,

	state: () => ({
		modalActive: false,
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
		toggleNav(state) {
			state.navActive = !state.navActive;
		},

		toggleModal(state) {
			state.modalActive = !state.modalActive;
		},
	},

	actions: {},
	getters: {},
};
