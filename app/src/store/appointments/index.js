import * as constants from './statusConstants';
import {
	createAppointmentBooking,
	cancelAppointmentBooking,
	rescheduleAppointmentBooking,
	fetchInitialAppointmentCalendar,
	fetchNextAppointmentDate,
} from '@/api/appointments';

export const appointments = {
	namespaced: true,

	state: () => ({
		status: constants.STATUS_READY,
		bookingTypeId: null,
		isConfirmed: false,
		selection: null,
		availability: [],
		nextFetchDate: null,
		isWaiting: false,
		appointmentId: null,
	}),

	mutations: {
		setStatus(state, status) {
			state.status = status;
		},

		setBookingTypeId(state, bookingTypeId) {
			state.bookingTypeId = bookingTypeId;
		},

		updateIsConfirmed(state, isConfirmed) {
			state.isConfirmed = isConfirmed;
		},

		updateSelectionTimeslot(state, timeslot) {
			state.selection = timeslot;
		},

		updateAvailability(state, availability) {
			state.availability = availability;
		},

		pushAvailability(state, date) {
			state.availability.push(date);
		},

		setNextFetchDate(state, date) {
			state.nextFetchDate = date;
		},

		setWaiting(state, isWaiting) {
			state.isWaiting = isWaiting;
		},

		setAppointmentId(state, appointmentId) {
			state.appointmentId = appointmentId;
		},
	},

	actions: {
		reschedule: ({ commit }) => {
			commit('setStatus', constants.STATUS_RESCHEDULING);
		},

		cancel: async ({ state, commit, dispatch }) => {
			commit('setWaiting', true);

			const cancellation = await cancelAppointmentBooking({
				appointmentId: state.appointmentId,
			});

			if (cancellation.message) {
				commit('setStatus', constants.STATUS_CANCELLED);
				dispatch('resetBookingState');
			}

			commit('setWaiting', false);
		},

		selectTimeslot: ({ commit, getters, dispatch }, timeslot) => {
			commit('updateSelectionTimeslot', timeslot);

			if (getters.isStatusCancelled) {
				dispatch('syncBookedStatus');
			}
		},

		initAppointmentCalendar: async ({ commit, dispatch, state }) => {
			commit('setWaiting', true);

			const availability = await fetchInitialAppointmentCalendar(state.bookingTypeId);

			commit('updateAvailability', availability);
			commit('setWaiting', false);
			dispatch('nextFetchDate');
		},

		pushNextAppointmentDate: async ({ commit, state, dispatch }) => {
			if (!state.nextFetchDate || typeof state.nextFetchDate === 'undefined') {
				return;
			}

			commit('setWaiting', true);

			const date = await fetchNextAppointmentDate(state.bookingTypeId, state.nextFetchDate);

			commit('pushAvailability', date);
			commit('setWaiting', false);
			dispatch('nextFetchDate');
		},

		nextFetchDate: ({ state, commit }) => {
			const datesCount = state.availability.length;

			if (!datesCount) {
				return;
			}

			const lastItem = state.availability[datesCount-1]

			if (!lastItem.next) {
				return;
			}

			commit('setNextFetchDate', lastItem.next);
		},

		confirmSelectedSlot: async ({ state, commit, rootState, rootGetters }) => {
			commit('setWaiting', true);

			let appointment = null;

			if (state.appointmentId) {
				appointment = await rescheduleAppointmentBooking({
					appointmentId: state.appointmentId,
					appointmentTypeId: state.bookingTypeId,
					time: state.selection,
				});
			} else {
				appointment = await createAppointmentBooking({
					appointmentTypeId: state.bookingTypeId,
					time: state.selection,
					email: rootState.user.user.email,
					firstName: rootGetters['user/getGivenName'],
					lastName: rootGetters['user/getFamilyName'],
				});
			}

			if (typeof appointment.id !== 'undefined' && appointment.id) {
				commit('setAppointmentId', appointment.id);
				commit('updateIsConfirmed', true);
				commit('setStatus', constants.STATUS_BOOKED);
			}

			commit('setWaiting', false);
		},

		syncBookedStatus: ({ state, commit }) => {
			if (state.isConfirmed) {
				commit('setStatus', constants.STATUS_BOOKED);
			} else {
				commit('setStatus', constants.STATUS_READY);
			}
		},

		resetBookingState: ({ commit }) => {
			commit('updateSelectionTimeslot', null);
			commit('updateIsConfirmed', false);
			commit('setAppointmentId', null);
		},
	},

	getters: {
		isStatusReady (state) {
			return state.status === constants.STATUS_READY;
		},

		isStatusBooked (state) {
			return state.status === constants.STATUS_BOOKED;
		},

		isStatusRescheduling (state) {
			return state.status === constants.STATUS_RESCHEDULING;
		},

		isStatusCancelled (state) {
			return state.status === constants.STATUS_CANCELLED;
		},
	},
};
