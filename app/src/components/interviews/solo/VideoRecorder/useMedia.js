import {
	ref,
	shallowReactive,
	onMounted,
	onBeforeUnmount,
} from 'vue';

export function useMedia() {
	const videoElementRef = ref(null);
	const stream = shallowReactive({});
	const recorder = shallowReactive({});
	const playbackURL = ref(null);

	const recordingOptions = {
		mimeType: 'video/webm; codecs=vp9',
	};

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

	const destroyMediaStream = () => {
		const tracks = stream.value.getTracks()()

		if (tracks.length) {
			tracks.forEach((track) => track.stop());
		}
	};

	const setupMediaRecorder = () => {
		recorder.value = new MediaRecorder(stream.value, recordingOptions);
		recorder.value.ondataavailable = onDataAvailable;
		recorder.value.onerror = onRecorderError;
	};

	let recordingBuffer = [];

	const onDataAvailable = (event) => {
		if (event.data.size > 0) {
			recordingBuffer.push(event.data);

			const blob = new Blob(recordingBuffer, { type: 'video/webm' });

			if (playbackURL.value) {
				URL.revokeObjectURL(playbackURL.value);
			}
			
			playbackURL.value = URL.createObjectURL(blob);
		}

		console.log(recordingBuffer);
	}

	const onRecorderError = (error) => {
		console.error(error);
	}

	const startRecording = () => {
		recorder.value.start();
	};

	const stopRecording = () => {
		recorder.value.stop();
	};

	onMounted( async () => {
		await navigator.mediaDevices
			.getUserMedia(constraints)
			.then(setupMediaStream)
			.then(setupMediaRecorder)
			.catch((error) => console.error(error));
	});

	onBeforeUnmount(() => {
		destroyMediaStream();
	});

	return {
		videoElementRef,
		stream,
		startRecording,
		stopRecording,
		playbackURL,
	};
}
