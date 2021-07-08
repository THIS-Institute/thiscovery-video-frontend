<template>
	<placeholder
		ratio="pt-3/4"
		class="bg-grey-400"
	>
		<video-placeholder
			v-show="!userSettings.video"
			:name="userName"
		/>

		<video
			v-show="userSettings.video"
			ref="videoElementRef"
			class="transform -scale-x-100 transition-opacity duration-200"
			:class="{
				'opacity-50': state.isPaused,
			}"
			preload="auto"
			autoplay
			playsinline
			muted
		/>

		<transition
			enter-active-class="transition-opacity ease-out duration-300"
			leave-active-class="transition-opacity ease-in duration-200"
			enter-from-class="opacity-0"
			leave-to-class="opacity-0"
			appear
		>
			<recording-indicator
				v-if="isRecording"
				:paused="state.isPaused"
			/>
		</transition>

		<transition
			enter-active-class="transition-opacity ease-out duration-300"
			leave-active-class="transition-opacity ease-in duration-200"
			enter-from-class="opacity-0"
			leave-to-class="opacity-0"
			appear
		>
			<recording-countdown
				v-if="isCountdown"
				@finish="onCountdownFinish"
			/>
		</transition>

		<inline-controls
			:state="state"
			@toggle-camera="onToggleCamera"
			@toggle-pause="handleTogglePaused"
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
	import { reactive, inject, onMounted, onBeforeUnmount, computed } from 'vue';
	import { useStore } from 'vuex';
	import { statuses, useRecordingState } from './useRecordingState';

	import VideoPlaceholder from './VideoPlaceholder';
	import RecorderControls from './RecorderControls';
	import RecordingIndicator from '@/components/RecordingIndicator';
	import RecordingCountdown from './RecordingCountdown';
	import InlineControls from './InlineControls';

	export default {
		name: 'VideoRecorder',

		components: {
			VideoPlaceholder,
			RecorderControls,
			RecordingIndicator,
			RecordingCountdown,
			InlineControls,
		},

		props: {
			userName: {
				type: String,
				default: null,
			},
		},

		emits: [
			'started',
			'pause',
			'resume',
			'stopped',
			'startCamera',
			'stopCamera',
		],

		setup(props, { emit }) {
			const store = useStore();
			const state = reactive({
				status: statuses.READY,
				isPaused: false,
			});

			const videoElementRef = inject('videoElementRef');
			const startRecording = inject('startRecording');
			const stopRecording = inject('stopRecording');
			const playbackURL = inject('playbackURL');
			const setupLocalVideo = inject('setupLocalVideo');
			const destroyMediaStream = inject('destroyMediaStream');

			const userSettings = computed(() => store.getters['app/getSettings']);

			onMounted(() => {
				setupLocalVideo();
			});

			onBeforeUnmount(() => {
				destroyMediaStream();
			});

			const {
				isReady,
				isRecording,
				isCountdown,
			} = useRecordingState(state);

			const handleStartRecording = () => {
				state.status = statuses.COUNTDOWN;
			};

			const handleStopRecording = () => {
				stopRecording();

				store.commit('interviews/setPlaybackURL', playbackURL);
				state.status = statuses.READY;

				emit('stopped');
			};

			const handelCancelCountdown = () => {
				state.status = statuses.READY;
			};
			
			const onCountdownFinish = () => {
				state.status = statuses.RECORDING;
				startRecording();
				emit('started');
			};

			const onToggleCamera = () => {
				store.commit('app/toggleCamera');
				(userSettings.value.video) ? emit('startCamera') : emit('stopCamera');
			};

			const handleTogglePaused = (isPaused) => {
				state.isPaused = isPaused;

				if (isPaused) {
					emit('pause');
					videoElementRef.value.pause();
				} else {
					emit('resume');
					videoElementRef.value.play();
				}
			};

			return {
				state,
				userSettings,
				videoElementRef,
				isReady,
				isRecording,
				isCountdown,
				handleStartRecording,
				handleStopRecording,
				handelCancelCountdown,
				onCountdownFinish,
				onToggleCamera,
				handleTogglePaused,
			}
		},
	};
</script>
