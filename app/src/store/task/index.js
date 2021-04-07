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
		nextFetchDate: null,
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

		setNextFetchDate(state, nextFetchDate) {
			state.nextFetchDate = nextFetchDate;
		},

		pushDateAppointmentCalendar(state, date) {
			state.appointmentCalendar.push(date);
		},
	},

	actions: {
		initAppointmentCalendar: async ({ commit, dispatch }) => {
			const calendar = await fetchInitialAppointmentCalendar();
			commit('setAppointmentCalendar', calendar);
			dispatch('setNextFetchDate');
		},

		pushNextAppointmentDate: async ({ commit, state, dispatch }) => {
			if (!state.nextFetchDate) {
				return;
			}

			const date = await fetchNextAppointmentDate(state.nextFetchDate);
			commit('pushDateAppointmentCalendar', date);
			dispatch('nextFetchDate');
		},

		nextFetchDate: ({ state, commit }) => {
			const datesCount = state.appointmentCalendar.length;

			if (!datesCount) {
				return;
			}

			const lastItem = state.appointmentCalendar[datesCount-1]

			if (!lastItem.next) {
				return;
			}

			commit('setNextFetchDate', lastItem.next);
		},
	},

	getters: {},
};
