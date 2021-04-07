import env from '@/app.env';

export async function fetchInitialAppointmentCalendar () {
	let calendar = [];

	await fetch(`${env.backendApiHost}/v1/appointment-slots/test`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
	.then(response => response.json())
	.then((response) => {
		if (response.dates) {
			calendar = response.dates;
		}
	})
	.catch((error) => console.error(error));

	return calendar;
}

export async function fetchNextAppointmentDate (date) {
	let availability = [];

	await fetch(`${env.backendApiHost}/v1/appointment-slots/test/${date}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
	.then(response => response.json())
	.then((response) => {
		if (response.timeslots) {
			availability = response;
		}
	})
	.catch((error) => console.error(error));

	return availability;
}
