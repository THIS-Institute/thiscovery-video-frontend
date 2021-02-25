import config from '@/app.config';

export const interviews = {
	namespaced: true,

	state: () => ({
		token: null,
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
		setAccessToken: (state, token) => {
			state.token = token;
		},
	},

	actions: {
		updateMediaDevices: ({ commit }) => {
			if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
				return;
			}

			navigator.mediaDevices.enumerateDevices()
				.then(function(devices) {
					commit('setAvailableCameras', {
						devices: devices.filter(device => device.kind === 'videoinput'),
					});

					commit('setAvailableAudioInput', {
						devices: devices.filter(device => device.kind === 'audioinput'),
					});

					commit('setAvailableAudioOutput', {
						devices: devices.filter(device => device.kind === 'audiooutput'),
					});
				})
				.catch(function(error) {
					console.error(`${error.name}: ${error.message}`);
				});
		},

		getAccessToken: async ({ commit }, data) => {
			await fetch(config.backendApiHost + '/v1/room/token', {
					method: 'POST',
					mode: 'no-cors',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data)
				})
				.then((response) => {
					const responseData = response.json();
					commit('setAccessToken', responseData.access_token);
				})
				.catch((error) => console.error(error));
		},
	},

	getters: {},
};
