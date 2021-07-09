export default Object.freeze({
	retake: {
		type: 'Confirm',
		value: {
			title: 'Are you sure you want to delete your recording and retake?',
			affirmative: {
				title: 'Yes, retake',
				icon: 'retake',
			},
		},
	},

	cancel: {
		type: 'Confirm',
		value: {
			title: 'Are you sure you want to cancel your appointment?',
			affirmative: {
				title: 'Yes, cancel',
			},
		},
	},

	leave: {
		type: 'Confirm',
		value: {
			title: 'Are you sure you want to leave?',
			affirmative: {
				title: 'Yes, leave',
			},
		},
	},

	phone: {
		type: 'Phone',
		value: null,
	},

	comment: {
		type: 'Comment',
		value: null,
	},

	troubleshoot: {
		type: 'Troubleshoot',
		value: null,
	},
});
