import env from '@/app.env';

export const interviews = {
	namespaced: true,

	state: () => ({
		token: null,
		activeVideoInput: null,
		activeAudioInput: null,
		activeAudioOutput: null,
		availableVideoInput: [],
		availableAudioInput: [],
		availableAudioOutput: [],
		declinedPermissions: false,
		playbackURL: null,
	}),

	mutations: {
		setAvailableVideoInput: (state, data) => {
			state.availableVideoInput = data.devices;
		},

		setAvailableAudioInput: (state, data) => {
			state.availableAudioInput = data.devices;
		},

		setAvailableAudioOutput: (state, data) => {
			state.availableAudioOutput = data.devices;
		},

		setActiveVideoInput: (state, device) => {
			state.activeVideoInput = device;
		},

		setActiveAudioInput: (state, device) => {
			state.activeAudioInput = device;
		},

		setActiveAudioOutput: (state, device) => {
			state.activeAudioOutput = device;
		},

		setAccessToken: (state, token) => {
			state.token = token;
		},

		setDeclinedPermissions: (state, status) => {
			state.declinedPermissions = status;
		},

		setPlaybackURL: (state, url) => {
			state.playbackURL = url;
		},

		setPlaybackTime: (state, time) => {
			state.playbackTime = time;
		},
	},

	actions: {
		updateMediaDevices: async ({ commit, dispatch }) => {
			if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
				return;
			}

			const constraints = {
				audio: true,
				video: true,
			};

			await navigator.mediaDevices
				.getUserMedia(constraints)
				.then(onUserMedia)
				.catch((error) => dispatch('handleUserMediaError', error));

			const onUserMedia = (mediaStream) => {
				commit('setDeclinedPermissions', false);

				const tracks = mediaStream.getTracks();
				tracks.forEach((track) => track.stop());
			};

			await navigator.mediaDevices
				.enumerateDevices()
				.then((devices) => dispatch('updateAvailableDevices', devices))
				.then(() => dispatch('updateDefaultActiveDevices'))
				.catch(function(error) {
					console.error(`${error.name}: ${error.message}`);
				});
		},

		handleUserMediaError({ commit }, error) {
			if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
				commit('setDeclinedPermissions', true);
				return;
			}
			console.error(error);
		},

		updateAvailableDevices({ commit }, devices) {
			if (!Array.isArray(devices)) {
				return;
			}

			commit('setAvailableVideoInput', {
				devices: devices.filter(device => device.kind === 'videoinput'),
			});

			commit('setAvailableAudioInput', {
				devices: devices.filter(device => device.kind === 'audioinput'),
			});

			commit('setAvailableAudioOutput', {
				devices: devices.filter(device => device.kind === 'audiooutput'),
			});
		},

		updateDefaultActiveDevices({ commit, state }) {
			if (state.activeVideoInput === null && state.availableVideoInput.length) {
				if (state.availableVideoInput[0].deviceId) {
					commit('setActiveVideoInput', state.availableVideoInput[0]);
				}
			}

			if (state.activeAudioInput === null && state.availableAudioInput.length) {
				if (state.availableAudioInput[0].deviceId) {
					commit('setActiveAudioInput', state.availableAudioInput[0]);
				}
			}

			if (state.activeAudioOutput === null && state.availableAudioOutput.length) {
				if (state.availableAudioOutput[0].deviceId) {
					commit('setActiveAudioOutput', state.availableAudioOutput[0]);
				}
			}
		},

		getAccessToken: async ({ commit }, data) => {
			await fetch(`${env.backendApiHost}/v1/room/token`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data)
				})
				.then(response => response.json())
				.then((response) => {
					if (response && response.access_token) {
						commit('setAccessToken', response.access_token);
					}
				})
				.catch((error) => console.error(error));
		},
	},

	getters: {
		hasConnectedVideoInput (state) {
			if (!Array.isArray(state.availableVideoInput)) {
				return false;
			}

			return state.availableVideoInput.length > 0
				&& (state.activeVideoInput !== null);
		},

		hasConnectedAudioInput (state) {
			if (!Array.isArray(state.availableAudioInput)) {
				return false;
			}

			return state.availableAudioInput.length > 0
				&& (state.activeAudioInput !== null);
		},

		hasConnectedAudioOutput (state) {
			if (!Array.isArray(state.availableAudioOutput)) {
				return false;
			}

			return state.availableAudioOutput.length > 0;
		},

		getActiveVideoInputName (state) {
			if (state.activeVideoInput === null || !('label' in state.activeVideoInput)) {
				return null;
			}

			return state.activeVideoInput.label;
		},

		getActiveAudioInputName (state) {
			if (state.activeAudioInput === null || !('label' in state.activeAudioInput)) {
				return null;
			}

			return state.activeAudioInput.label;
		},

	},
};
