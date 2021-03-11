import * as route from './routeConstants';

const userInterviewPaths = Object.freeze([
	{
		icon: 'camera',
		title: 'Live interview',
		content: 'Book an online meeting with a member of the online research team',
		items: [
			'Speak directly with a reasearcher',
			'At a time that suits you',
			'Video or audio-only call',
		],
		cta: {
			title: 'Make an appointment',
			route: route.ROUTE_APPOINTMENTS,
		},
		tutorial: {
			title: 'Want to know more?',
			cta: {
				title: 'See how an appointment works',
				route: route.ROUTE_HOME,
			}
		},
		available: true,
	},

	{
		icon: 'video',
		title: 'Self record',
		content: 'Record your responses privately and in your own time',
		items: [
			'Start right away or whenever you like',
			'Read and respond at your leisure',
			'Pause and resume on any device',
		],
		cta: {
			title: 'Record responses',
			route: route.ROUTE_SELF_SETTINGS,
		},
		tutorial: {
			title: 'Want to know more?',
			cta: {
				title: 'See how self-record works',
				route: route.ROUTE_SELF_HOWTO,
			}
		},
		available: true
	},
]);

const selfRecordInstructions = Object.freeze([
	{
		title: 'You\'ll be asked a series of questions',
		content: 'Nullam quis risus eget urna mollis ornare vel eu leo. Macenas faucibus mollis interdum',
		img: {
			src: '//placehold.it/275x428?text=1',
			alt: 'Placeholder image',
		},
	},
	{
		title: 'Mollis ornare vel eu leo',
		content: 'Doloremque tenetur nobis quas optio! Assumenda esse iure, dolorum porro ex eum doloribus itaque fugit soluta architecto quae.',
		img: {
			src: '//placehold.it/275x428?text=2',
			alt: 'Placeholder image',
		},
	},
	{
		title: 'Doloribus itaque fugit soluta architecto',
		content: 'Repellendus suscipit in quam recusandae architecto illum mollitia molestias, excepturi dolore sunt, hic totam ab quod id ut numquam ad quibusdam.',
		img: {
			src: '//placehold.it/275x428?text=3',
			alt: 'Placeholder image',
		},
	}
]);

const liveInterviewInstructions = Object.freeze([
	{
		title: 'You\'ll be asked a series of questions',
		content: 'Nullam quis risus eget urna mollis ornare vel eu leo. Macenas faucibus mollis interdum',
		img: {
			src: '//placehold.it/275x428?text=1',
			alt: 'Placeholder image',
		},
	},
	{
		title: 'Mollis ornare vel eu leo',
		content: 'Doloremque tenetur nobis quas optio! Assumenda esse iure, dolorum porro ex eum doloribus itaque fugit soluta architecto quae.',
		img: {
			src: '//placehold.it/275x428?text=2',
			alt: 'Placeholder image',
		},
	},
	{
		title: 'Doloribus itaque fugit soluta architecto',
		content: 'Repellendus suscipit in quam recusandae architecto illum mollitia molestias, excepturi dolore sunt, hic totam ab quod id ut numquam ad quibusdam.',
		img: {
			src: '//placehold.it/275x428?text=3',
			alt: 'Placeholder image',
		},
	}
]);

export default Object.freeze({
	landing: {
		title: 'Choose how to take part',
		content: 'Would you like to have a conversation or record yourself?',
		paths: userInterviewPaths,
	},

	live: {
		methodOverview: {
			instructions: liveInterviewInstructions,
		},
		
		appointments: {
			title: 'Book a live interview',
			content: 'Pick from the available dates and times',
			info: {
				title: 'What happens next?',
				content: 'You will receive confirmation and reminder emails. When it\'s nearly time for your appointment, click the link in your email to enter the meeting room.',
			},
		},

		joinByPhone: {
			title: 'Join by phone',
			number: {
				title: 'Enter this PIN when prompted:',
				value: '+44 20 3956 7834',
			},
			pin: {
				title: 'Enter this PIN when prompted:',
				value: '456 666 554#',
			}
		},

		landing: {
			title: 'Live Interview',
			content: 'Suggestion recommendations for good practice',
			due: 'Your appointment is due to start…',
			date: 'Thu 02 Dec 2020, 08:15am',
			cancel: 'No longer able to make this appointment?',
		},

		bookingStatus: {
			success: 'Appointment confirmed',
			failed: 'Something went wrong',
		},
	
		selectedSlot: {
			title: 'Choose a fixed start',
			content: 'Appointments have no duration and last as long as you need them to.',
			change: 'You can change or cancel this slot later if you need to.',
			confirmation: 'Your interview is booked for…',
		},
	},

	preSettings: {
		title: 'All set to begin?',
		content: 'You can disable your camera using the controls above if you would like to. Access to your microphone is required.',
		cta: {
			title: 'Join live interview',
			url: {
				name: route.ROUTE_LIVE_ROOM
			}
		},
		devices: {
			camera: {
				title: 'Camera [FaceTimeHD] is enabled',
				enabled: true
			},
			microphone: {
				title: 'No microphone detected',
				enabled: false
			}
		},
		infoBar: {
			title: 'Having trouble?',
			cta: {
				title: 'Join by phone',
				url: '#',
			}
		}
	},

	selfRecord: {
		methodOverview: {
			instructions: selfRecordInstructions,
		},
		preSettings: {
			title: 'All set to begin?',
			content: 'Access to your microphone is required. Video access is encouraged but you can disable your camera using the controls above if you wish.',
			cta: {
				title: 'See the first question',
				url: {
					name: route.ROUTE_SELF_INTERVIEW,
				},
			},
		},
	}
});
