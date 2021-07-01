import * as route from './routeConstants';

const userInterviewPaths = Object.freeze({
	live: {
		icon: 'camera',
		title: 'Live interview',
		content: 'Book an online meeting with a member of the research team',
		items: [
			'Speak directly with a reasearcher',
			'At a time that suits you',
			'Video or audio-only call',
		],
		ctaTitleHasBooking: 'View your booking',
		ctaTitleNoBooking: 'Make an appointment',
		ctaRoute: route.ROUTE_APPOINTMENTS,
		tutorial: {
			title: 'Want to know more?',
			cta: {
				title: 'See how a live interview works',
				route: route.ROUTE_LIVE_HOWTO,
			}
		},
	},

	selfRecord: {
		icon: 'video',
		title: 'Self record',
		content: 'Record your responses privately and in your own time',
		items: [
			'Start right away or whenever you like',
			'Read and respond at your leisure',
			'Pause and resume on any device',
		],
		ctaTitle: 'Record your responses',
		ctaRoute: route.ROUTE_SELF_SETTINGS,
		tutorial: {
			title: 'Want to know more?',
			cta: {
				title: 'See how self-record works',
				route: route.ROUTE_SELF_HOWTO,
			}
		},
	},
});

const selfRecordInstructions = Object.freeze([
	{
		title: 'You\'ll be asked a series of questions',
		content: 'We are interested in learning about your views and experiences.',
		img: {
			src: '/static/img/tutorial/self-record/asked-questions.png',
			alt: 'Placeholder image',
		},
	},
	{
		title: 'You can record answers in your own time',
		content: 'Audio recording is required but you can disable your camera.',
		img: {
			src: '/static/img/tutorial/self-record/record-in-your-own-time.png',
			alt: 'Placeholder image',
		},
	},
	{
		title: 'Review the recording before it is sent',
		content: 'You can play it back, type comments, or start again.',
		img: {
			src: '/static/img/tutorial/self-record/review-recording.png',
			alt: 'Placeholder image',
		},
	}
]);

const liveInterviewInstructions = Object.freeze([
	{
		title: 'Book your appointment with a researcher',
		content: 'Select a time that best suits you.',
		img: {
			src: '/static/img/tutorial/live/book-your-appointment.png',
			alt: 'Placeholder image',
		},
	},
	{
		title: 'Join on the day of your interview',
		content: 'You\'ll be able to disable your camera or microphone if necessary.',
		img: {
			src: '/static/img/tutorial/live/join-on-day-of-interview.png',
			alt: 'Placeholder image',
		},
	},
	{
		title: 'You\'ll speak directly to a researcher',
		content: 'They may have a series of questions which will be visible on screen.',
		img: {
			src: '/static/img/tutorial/live/speak-directly-to-researcher.png',
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
		title: 'Live interview',
		icon: 'camera',

		methodOverview: {
			instructions: liveInterviewInstructions,
		},

		appointments: {
			title: 'Book a live interview',
			content: 'Pick from the available dates and times',
			info: {
				cancelled: {
					title: 'Book another appointment',
					content: 'Changed your mind? No problem, please book your appointment below.',
				},
				confirmed: {
					title: 'What happens next?',
					content: 'You will receive confirmation and reminder emails. When it\'s nearly time for your appointment, click the link in your email to enter the meeting room.',
				},
			},
		},

		joinByPhone: {
			title: 'Join by phone',
			number: {
				title: 'Call this number:',
				value: '+44 20 3956 7834',
			},
			pin: {
				title: 'Enter this PIN when prompted:',
				value: '456 666 554#',
			}
		},

		landing: {
			due: 'Your appointment is…',
			cancel: 'No longer able to make this appointment?',
		},

		bookingStatus: {
			title: {
				success: 'Appointment confirmed',
				cancelled: 'Appointment cancelled',
				failed: 'Something went wrong',
			},

			content: {
				success: 'You\'ll receive a confirmation email shortly',
				cancelled: 'You have successfully cancelled your appointment',
				failed: 'Please check back later',
			},
		},
	
		selectedSlot: {
			title: 'Choose a fixed start',
			content: 'Appointments have no fixed duration and last as long as you need them to. Appointments usually take around 45 minutes.',
			change: 'You can change or cancel this slot later if you need to.',
			confirmation: 'Your interview is booked for:',
		},

		preSettings: {
			continueButtonText: 'Join live interview',
		}
	},

	preSettings: {
		title: 'All set to begin?',
		content: 'You can disable your camera using the controls above if you would like to. Access to your microphone is required. You can save and exit at any point during the interview and return later to complete the questions at your convenience.',
		error: {
			title: 'Something isn\'t right…',
			content: 'Your camera or microphone seem to be unavailable, please resolve before continuing.',
		},
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
	},

	selfRecord: {
		title: 'Self-record',
		icon: 'video',

		methodOverview: {
			instructions: selfRecordInstructions,
		},
		preSettings: {
			continueButtonText: 'See the first question',
			title: 'All set to begin?',
			content: 'Access to your microphone is required. Video access is encouraged but you can disable your camera using the controls above if you wish.',
			cta: {
				title: 'See the first question',
				url: {
					name: route.ROUTE_SELF_INTERVIEW,
				},
			},
		},
	},

	troubleShoot: {
		title: 'Fixing camera and microphone issues',
		items: [
			{
				title: 'If you\'re not using additional peripherals:',
				suggestions: [
					'Make sure the computer has a mic/webcam. Most current laptops have a webcam and mic, but desktops usually don\'t.',
					'Check the computer settings to make sure the camera and sound settings are correct.',
					'For the mic, check if the input sensitivity is too low or too high which could cause issues.',
					'For PCs/Windows, check the drivers to see if they are installed and updated.',
					'For Macs, make sure your operating system is updated.',
					'Restart the computer.',
				],
			},
			{
				title: 'If you are using peripherals (such as a headset or external camera):',
				suggestions: [
					'Check the computer settings to make sure the camera and sound settings are using the correct source.',
					'If there are multiple devices plugged in, there\'s a chance the webcam also has a built in mic and the settings are set to the default input and not to the one you require.',
					'Check the input sensitivity of your mic to ensure it is not too low or too high which could cause issues.',
					'Check the settings in the application to make sure the correct peripherals are selected.',
					'Also check to see if anything is muted in either the application or computer settings.',
					'Check the sound level as it can reset for peripherals back down to 0 when plugged in.',
					'If you are using a headset/mic, there may be physical buttons on the device that also mute sound output, mic input and overall sound control. (This will vary by device.)',
					'Unplug the peripheral/s and plug them back in.',
					'Try another port on the computer if available.',
					'Refresh your browser.',
				],
			},
			{
				title: 'If you are using a smartphone:',
				suggestions: [
					'Ensure you have given your browser permissions to use your microphone and camera.',
					'If you are using an in-app browser, try switching to the safari or chrome app.',
					'Refresh your browser.',
				],
			},
		],
	},
});
