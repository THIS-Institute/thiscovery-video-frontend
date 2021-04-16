import {
	ref,
	shallowReactive,
	provide,
} from 'vue';

export function useMedia() {
	const videoElementRef = ref(null);
	const stream = shallowReactive({});
	const recorder = shallowReactive({});
	const playbackURL = ref(null);

	const constraints = {
		audio: true,
		video: true,
	}

	const setupMediaStream = async (mediaStream) => {
		stream.value = mediaStream;

		if ('srcObject' in videoElementRef.value) {
			videoElementRef.value.srcObject = stream.value;
		} else {
			videoElementRef.value.src = URL.createObjectURL(stream.value);
		}
	};

	const destroyMediaStream = async () => {
		const tracks = await stream.value.getTracks();

		if (tracks.length) {
			await new Promise((resolve) => {
				tracks.forEach((track) => track.stop());
				resolve
			});
		}
	};

	const setupMediaRecorder = () => {
		recorder.value = new MediaRecorder(stream.value);
		recorder.value.ondataavailable = onDataAvailable;
		recorder.value.onerror = onRecorderError;
	};

	let recordingBuffer = ref([]);

	const onDataAvailable = (event) => {
		if (event.data.size > 0) {
			recordingBuffer.value.push(event.data);

			const blobOptions = {
				type: recorder.value.mimeType,
			}

			const blob = new Blob(recordingBuffer.value, blobOptions);

			if (playbackURL.value) {
				URL.revokeObjectURL(playbackURL.value);
			}
			
			playbackURL.value = URL.createObjectURL(blob);
		}
	}

	const onRecorderError = (error) => {
		console.log('Recorder Error:');
		console.error(error);
	}

	const startRecording = () => {
		recorder.value.start();
	};

	const stopRecording = () => {
		recorder.value.stop();
	};

	const setupLocalVideo = () => {
		navigator.mediaDevices
			.getUserMedia(constraints)
			.then(setupMediaStream)
			.then(setupMediaRecorder)
			.catch((error) => console.error(error));
	};

	provide('videoElementRef', videoElementRef);
	provide('setupLocalVideo', setupLocalVideo);
	provide('destroyMediaStream', destroyMediaStream);
	provide('stream', stream);

	return {
		startRecording,
		stopRecording,
		playbackURL,
	}
}
