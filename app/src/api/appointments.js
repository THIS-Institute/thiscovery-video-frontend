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
	await client.post('appointments', data)
		.then((response) => console.log(response))
		.catch((error) => console.error(error));
}

export async function rescheduleAppointmentBooking (appointmentId, datetime) {
	const data = {
		datetime: datetime,
	};

	await client.patch(`appointments/${appointmentId}}`, data)
		.then((response) => console.log(response))
		.catch((error) => console.error(error));
}

export async function cancelAppointmentBooking (appointmentId) {
	await client.delete(`appointments/${appointmentId}}`)
		.then((response) => console.log(response))
		.catch((error) => console.error(error));
}
