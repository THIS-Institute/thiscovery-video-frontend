import { client } from './backend';

export async function fetchInitialAppointmentCalendar (appointmentTypeId) {
	let calendar = [];

	await client.get(`appointment-slots/${appointmentTypeId}`)
		.then((response) => {
			if (response.dates) {
				calendar = response.dates;
			}
		})
		.catch((error) => console.error(error));

	return calendar;
}

export async function fetchNextAppointmentBatch (appointmentTypeId, dateOffset) {
	let calendar = [];
	
	await client.get(`appointment-slots/${appointmentTypeId}/?offset=${dateOffset}`)
		.then((response) => {
			if (response.dates) {
				calendar = response.dates;
			}
		})
		.catch((error) => console.error(error));

	return calendar;
}

export async function fetchNextAppointmentDate (appointmentTypeId, date) {
	let availability = [];

	await client.get(`appointment-slots/${appointmentTypeId}/${date}`)
		.then((response) => {
			if (response.timeslots) {
				availability = response;
			}
		})
		.catch((error) => console.error(error));

	return availability;
}

export async function createAppointmentBooking (data) {
	const response = await client.post('appointments', data);
	
	if (typeof response.id === 'undefined') {
		throw new AppointmentError('Failed to create appointment');
	}

	return response;
}

export async function rescheduleAppointmentBooking (options) {
	const data = {
		appointmentTypeId: options.appointmentTypeId,
		time: options.time,
	};

	const response = await client.patch(`appointments/${options.appointmentId}`, data);

	if (typeof response.id === 'undefined') {
		throw new AppointmentError('Failed to reschedule appointment');
	}

	return response;
}

export async function cancelAppointmentBooking (options) {
	const response = await client.delete(`appointments/${options.appointmentId}`);

	if (typeof response.message === 'undefined') {
		throw new AppointmentError('Failed to cancel appointment');
	}

	return response
}

class AppointmentError extends Error {
	constructor(...params) {
		super(...params);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, AppointmentError)
		}
	}
}
