import env from '@/app.env';

export async function fetchInitialAppointmentCalendar () {
	let calendar = [];

	await fetch(`${env.backendApiHost}/v1/appointments/test/slots`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
	.then(response => response.json())
	.then((response) => {
		if (response.slots) {
			calendar = response.slots;
		}
	})
	.catch((error) => console.error(error));

	return calendar;
}

export function fetchNextAppointmentDate () {
	return [];
}
