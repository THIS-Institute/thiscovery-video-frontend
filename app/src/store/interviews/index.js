export const interviews = {
	namespaced: true,

	state: () => ({
		availableCameras: [],
		availableAudioInput: [],
		availableAudioOutput: [],
	}),

	mutations: {
		setAvailableCameras: (state, data) => {
			state.availableCameras = data.devices;
		},
		setAvailableAudioInput: (state, data) => {
			state.availableAudioInput = data.devices;
		},
		setAvailableAudioOutput: (state, data) => {
			state.availableAudioOutput = data.devices;
		},
	},

	actions: {
		updateMediaDevices: (context) => {
			if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
				return;
			}

			navigator.mediaDevices.enumerateDevices()
				.then(function(devices) {
					context.commit('interviews/setAvailableCameras', {
						devices: devices.filter(device => device.kind === 'videoinput'),
					});

					context.commit('interviews/setAvailableAudioInput', {
						devices: devices.filter(device => device.kind === 'audioinput'),
					});

					context.commit('interviews/setAvailableAudioOutput', {
						devices: devices.filter(device => device.kind === 'audiooutput'),
					});
				})
				.catch(function(error) {
					console.error(`${error.name}: ${error.message}`);
				});
		},
	},

	getters: {},
};
