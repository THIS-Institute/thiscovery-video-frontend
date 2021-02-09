export const task = {
	namespaced: true,

	state: () => ({
		timeslot: null,
	}),

	mutations: {
		select(state, { date, slot }) {
			state.timeslot = {
				date: date.title,
				slot: slot.time,
				meridiem: slot.meridiem,
			};
		},

		clear(state) {
			state.timeslot = null;
		},
	},

	actions: {},
	getters: {},
};
