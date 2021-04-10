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
			@canplay="onVideoCanPlay"
			@ended="onVideoEnd"
		/>

		<inline-controls
			@watch-answer="onWatchAnswer"
			@add-comments="onAddComments"
			@toggle-playback="onTogglePlayback"
		/>
	</placeholder>

	<video-controls
		@scrub="onScrub"
		@add-more="onAddMore"
		@next-question="$emit('nextQuestion')"
	/>
</template>

<script>
	import { ref, reactive, provide } from 'vue';

	import InlineControls from './InlineControls';
	import VideoControls from './VideoControls';

	export default {
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
			'nextQuestion',
		],

		setup() {
			const video = ref(null);

			const state = reactive({
				duration: 0,
				currentTime: 0,
				isPlaying: false,
				isReviewing: false,
			});

			provide('state', state);

			const onWatchAnswer = () => {
				state.isReviewing = true;
				state.isPlaying = true;
				video.value.play();
			};

			const onAddComments = () => {
				console.log('Add comments');
			};

			const onScrub = (event) => {
				video.value.currentTime = parseFloat(event.target.value);
			};

			const onAddMore = () => {
				console.log('Add more');
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

			const onVideoCanPlay = () => {
				state.duration = video.value.duration;
			};

			const onVideoEnd = () => {
				state.isPlaying = false;
				state.isReviewing = false;
				state.currentTime = 0;
			};

			return {
				state,
				video,
				onWatchAnswer,
				onAddComments,
				onScrub,
				onAddMore,
				onTogglePlayback,
				onTimeUpdate,
				onVideoCanPlay,
				onVideoEnd,
			}
		}
	};
</script>
