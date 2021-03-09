import config from '@/app.config';
import { fetchInitialAppointmentSlots } from '@/api/appointments';

export const task = {
	namespaced: true,

	state: () => ({
		appointmentSlots: [],
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
			}, config.inducedBackendLag);
		},

		clear(state) {
			state.timeslot = null;
		},

		setAppointmentSlots(state, slots) {
			state.appointmentSlots = slots;
		},
	},

	actions: {
		initAppointmentSlots: async ({ commit }) => {
			const slots = await fetchInitialAppointmentSlots();
			commit('setAppointmentSlots', slots);
		},
	},

	getters: {},
};
