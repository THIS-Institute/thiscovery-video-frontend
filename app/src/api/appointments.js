import config from '@/app.config';

const chanceAvailable = () => {
	const chance = Math.floor(Math.random() * 5);
	return chance > 1;
};

const getMockSlots = (date, daysToGenerate) => {
	let data = [];

	for (let i = 0; i <= daysToGenerate; i++) {
		const calendarDay = getMockCalendarDay(date);

		data.push(calendarDay);
		date.setDate(date.getDate() + 1);
	}

	return data;
};

const getMockCalendarDay = (date) => {
	const startHour = 9;
	let timeslots = [];

	for (let i = 0; i <= 8; i++) {
		const hour = startHour + i;
		const paddedHour = String(hour).padStart(2, '0');

		timeslots.push({
			time: `${paddedHour}:00`,
			meridiem: (hour >= 12) ? 'pm' : 'am',
			available: chanceAvailable(),
		});
	}

	const dateOptions = {
		weekday: 'short',
		day: 'numeric',
		month: 'short'
	};

	const formattedDate = new Intl.DateTimeFormat('en-GB', dateOptions).format(date);

	return {
		title: formattedDate,
		timeslots: timeslots,
	};
};

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchInitialAppointmentSlots () {
	const date = new Date();
	const daysToGenerate = 5;

	await sleep(config.inducedBackendLag);

	const data = getMockSlots(date, daysToGenerate);

	return {
		title: 'Suggest recommendation for good practice',
		calendar: data,
	}
}

export function fetchNextAppointmentSlots (dateString) {
	const date = new Date(dateString);
	return getMockCalendarDay(date);
}
