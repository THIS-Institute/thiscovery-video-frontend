import env from '@/app.env';

import {
	fetchInitialAppointmentCalendar,
	fetchNextAppointmentDate,
} from '@/api/appointments';

export const task = {
	namespaced: true,

	state: () => ({
		title: 'Suggest recommendation for good practice',
		appointmentCalendar: [],
		timeslot: null,
		confirmed: false,
		isSubmitting: false,
	}),

	mutations: {
		select(state, timeslot) {
			state.timeslot = timeslot;
		},

		confirmSlot(state) {
			state.isSubmitting = true;

			setTimeout(() => {
				state.confirmed = true;

				state.isSubmitting = false;
			}, env.inducedBackendLag);
		},

		clear(state) {
			state.timeslot = null;
		},

		setAppointmentCalendar(state, calendar) {
			state.appointmentCalendar = calendar;
		},

		pushDateAppointmentCalendar(state, date) {
			state.appointmentCalendar.push(date);
		},
	},

	actions: {
		initAppointmentCalendar: async ({ commit }) => {
			const calendar = await fetchInitialAppointmentCalendar();
			commit('setAppointmentCalendar', calendar);
		},

		pushNextAppointmentDate: async ({ commit, state }) => {
			const lastAppointmentDate = state.appointmentCalendar[state.appointmentCalendar.length - 1];

			if (!lastAppointmentDate) {
				return;
			}

			const date = await fetchNextAppointmentDate(lastAppointmentDate.date);
			commit('pushDateAppointmentCalendar', date);
		},
	},

	getters: {},
};
