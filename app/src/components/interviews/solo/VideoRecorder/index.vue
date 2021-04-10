<template>
	<placeholder
		ratio="pt-3/4"
		class="bg-grey-400"
	>
		<video-placeholder
			v-show="!showVideo"
			:name="userName"
		/>

		<video-preview
			v-show="showVideo"
		/>

		<recording-indicator
			v-if="isRecording"
		/>

		<recording-countdown
			v-if="isCountdown"
			@finish="onCountdownFinish"
		/>

		<inline-controls
			:state="state"
			@toggle-camera="handleToggleCamera"
			@toggle-microphone="handleToggleMicrophone"
		/>
	</placeholder>

	<recorder-controls
		:state="state"
		@start-recording="handleStartRecording"
		@stop-recording="handleStopRecording"
		@cancel-countdown="handelCancelCountdown"
	/>
</template>

<script>
	import { reactive, ref } from 'vue';
	import { statuses, useRecordingState } from './useRecordingState';

	import VideoPreview from '@/components/interviews/settings/VideoPreview';
	import VideoPlaceholder from './VideoPlaceholder';
	import RecorderControls from './RecorderControls';
	import RecordingIndicator from './RecordingIndicator';
	import RecordingCountdown from './RecordingCountdown';
	import InlineControls from './InlineControls';

	export default {
		components: {
			VideoPreview,
			VideoPlaceholder,
			RecorderControls,
			RecordingIndicator,
			RecordingCountdown,
			InlineControls,
		},

		props: {
			userName: {
				type: String,
				required: true,
			},
		},

		emits: [
			'ready',
			'recording',
		],

		setup(props, { emit }) {
			const state = reactive({
				status: statuses.READY,
			});
		
			const {
				isReady,
				isRecording,
				isCountdown,
			} = useRecordingState(state);

			const showVideo = ref(true);

			const handleStartRecording = () => {
				state.status = statuses.COUNTDOWN;
			};

			const handleStopRecording = () => {
				state.status = statuses.READY;
				emit('ready');
			};

			const handelCancelCountdown = () => {
				state.status = statuses.READY;
			};
			
			const onCountdownFinish = () => {
				state.status = statuses.RECORDING;
				emit('recording');
			};

			const handleToggleCamera = () => {
				showVideo.value = !showVideo.value;
			};

			const handleToggleMicrophone = () => {};

			return {
				state,
				isReady,
				isRecording,
				isCountdown,
				handleStartRecording,
				handleStopRecording,
				handelCancelCountdown,
				onCountdownFinish,
				showVideo,
				handleToggleCamera,
				handleToggleMicrophone,
			}
		},
	};
</script>
