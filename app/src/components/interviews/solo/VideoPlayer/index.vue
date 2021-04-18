<template>
	<placeholder
		ratio="pt-3/4"
		class="bg-grey-400"
	>
		<video
			ref="video"
			class="absolute inset-0 w-full h-full object-cover"
			:src="videoPlaybackUrl"
			@timeupdate="onTimeUpdate"
			@ended="onVideoEnd"
			@durationchange="onDurationChange"
			@canplay="onCanPlay"
			@loadedmetadata="onMetadataLoaded"
		/>

		<inline-controls
			@watch-answer="onWatchAnswer"
			@toggle-playback="onTogglePlayback"
			@add-comments="$emit('addComments')"
		/>
	</placeholder>

	<video-controls
		@scrub="onScrub"
		@progress-question="$emit('progressQuestion')"
		@retake="$emit('retake')"
	/>
</template>

<script>
	import { ref, reactive, provide } from 'vue';
	import getBlobDuration from './getBlobDuration';

	import InlineControls from './InlineControls';
	import VideoControls from './VideoControls';

	export default {
		name: 'VideoPlayer',

		components: {
			InlineControls,
			VideoControls,
		},

		props: {
			videoPlaybackUrl: {
				type: String,
				required: true,
			},
		},

		emits: [
			'retake',
			'progressQuestion',
			'addComments',
		],

		setup(props) {
			const video = ref(null);

			const state = reactive({
				duration: 0,
				currentTime: 0,
				isPlaying: false,
				isReviewing: false,
				canPlay: false,
			});

			provide('state', state);

			getBlobDuration(props.videoPlaybackUrl)
				.then((duration) => state.duration = duration);

			const onWatchAnswer = () => {
				state.isReviewing = true;

				video.value
					.play()
					.then(() => {
						state.isPlaying = true;
					});
			};

			const onScrub = (event) => {
				video.value.currentTime = parseFloat(event.target.value);
			};

			const onTogglePlayback = () => {
				state.isPlaying = !state.isPlaying;

				if (state.isPlaying) {
					video.value.play();
				} else {
					video.value.pause();
				}
			};

			const onTimeUpdate = () => {
				state.currentTime = video.value.currentTime;
			};

			const onVideoEnd = () => {
				state.isPlaying = false;
				state.isReviewing = false;
				video.value.currentTime = 0;
			};

			const onDurationChange = () => {
				state.duration = video.value.duration;
			};

			const onCanPlay = () => {
				state.canPlay = true;
			};

			const onMetadataLoaded = () => {};

			return {
				state,
				video,
				onWatchAnswer,
				onScrub,
				onTogglePlayback,
				onTimeUpdate,
				onVideoEnd,
				onDurationChange,
				onCanPlay,
				onMetadataLoaded,
			}
		}
	};
</script>
