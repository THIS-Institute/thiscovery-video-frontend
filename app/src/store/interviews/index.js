import {
	getSelfRecordQuestions,
	getInterviewersQuestions,
} from '@/api/tasks';

import {
	fetchAppointment,
} from '@/api/appointments';

import {
	fetchRoomToken,
	linkInterviewRoom,
	createSelfRecord,
} from '@/api/interviews';

export const interviews = {
	namespaced: true,

	state: () => ({
		id: null,
		token: null,
		activeVideoInput: null,
		activeAudioInput: null,
		activeAudioOutput: null,
		availableVideoInput: [],
		availableAudioInput: [],
		availableAudioOutput: [],
		declinedPermissions: false,
		playbackURL: null,
		selfRecordQuestions: [],
		interviewerQuestions: [],
		selfRecordProgress: null,
	}),

	mutations: {
		setId: (state, id) => {
			state.id = id;
		},

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

		setSelfRecordQuestions: (state, questions) => {
			state.selfRecordQuestions = questions;
		},

		setInterviewerQuestions: (state, questions) => {
			state.interviewerQuestions = questions;
		},

		setSelfRecordProgress: (state, progress) => {
			state.selfRecordProgress = progress;
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

			const onUserMedia = (mediaStream) => {
				commit('setDeclinedPermissions', false);

				const tracks = mediaStream.getTracks();
				tracks.forEach((track) => track.stop());
			};

			await navigator.mediaDevices
				.getUserMedia(constraints)
				.then(onUserMedia)
				.catch((error) => dispatch('handleUserMediaError', error));

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

		getAppointment: async ({ commit, dispatch }, data) => {
			const appointment = await fetchAppointment(data.room);

			commit('setId', appointment.interviewId);
			
			dispatch('appointments/initExisting', appointment.appointment, { root: true});

			if (appointment.task && appointment.task.id) {
				commit('task/setId', appointment.task.id, { root: true });
				commit('task/setTitle', appointment.task.title, { root: true });
				commit('task/setCompletionUrl', appointment.task.completionUrl, { root: true });
			}
		},

		getAccessToken: async ({ commit, rootGetters }, options) => {
			const accessToken = await fetchRoomToken({
				room: options.room,
				identity: rootGetters['user/getIdentity'],
			});

			commit('setAccessToken', accessToken);
		},

		getSelfRecordQuestions: async ({ commit, rootState }) => {
			const taskID = rootState.task.id;
			const questions = await getSelfRecordQuestions(taskID);
			commit('setSelfRecordQuestions', questions.blocks);
		},

		getInterviewerQuestions: async ({ commit, rootState }) => {
			const taskID = rootState.task.id;
			const response = await getInterviewersQuestions(taskID);

			if (response.questions !== undefined) {
				commit('setInterviewerQuestions', response.questions);
			}
		},

		startSelfRecord: async ({ commit, rootState }) => {
			const options = {
				interviewId: rootState.interviews.id,
				taskId: rootState.task.id,
				anonUserId: rootState.user.anonUserId,
				anonUserTaskId: rootState.user.anonUserTaskId,
			};

			const response = await createSelfRecord(options);

			commit('setId', response.interviewId);
			commit('setSelfRecordQuestions', response.interviewQuestions.blocks);
			commit('setSelfRecordProgress', response.progress);
		},

		linkRoom: async ({ state }, roomSid) => {
			await linkInterviewRoom({
				roomSid: roomSid,
				interviewId: state.id,
			});
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

		hasInterviewerQuestions (state) {
			return (
				state.interviewerQuestions &&
				Array.isArray(state.interviewerQuestions) &&
				(state.interviewerQuestions.length > 0)
			);
		},
	},
};
