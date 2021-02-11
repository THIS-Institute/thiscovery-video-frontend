export const task = {
	namespaced: true,

	state: () => ({
		timeslot: null,
		confirmed: false,
		isSubmitting: false,
	}),

	mutations: {
		select(state, { date, slot }) {
			state.timeslot = {
				date: date.title,
				slot: slot.time,
				meridiem: slot.meridiem,
			};
		},

		confirmSlot(state) {
			state.isSubmitting = true;

			setTimeout(() => {
				state.confirmed = true;

				state.isSubmitting = false;
			}, 2000);
		},

		clear(state) {
			state.timeslot = null;
		},
	},

	actions: {},
	getters: {},
};
