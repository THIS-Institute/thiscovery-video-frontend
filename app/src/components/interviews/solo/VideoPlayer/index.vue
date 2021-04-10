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
		/>

		<inline-controls
			@watch-answer="onWatchAnswer"
			@add-comments="onAddComments"
		/>
	</placeholder>

	<video-controls
		@scrub="onScrub"
		@add-more="onAddMore"
		@next-question="onNextQuestion"
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

		setup() {
			const video = ref(null);

			const state = reactive({
				duration: 0,
				currentTime: 0,
			});

			provide('state', state);

			const onWatchAnswer = () => {
				video.value.play();
				console.log('Watch answer');
			};

			const onAddComments = () => {
				console.log('Add comments');
			};

			const onScrub = (event) => {
				video.value.currentTime = parseInt(event.target.value);
			};

			const onAddMore = () => {
				console.log('Add more');
			};

			const onNextQuestion = () => {
				console.log('Next question');
			};

			const onTimeUpdate = () => {
				state.currentTime = video.value.currentTime;
				console.log(state.currentTime);
			};

			const onVideoCanPlay = () => {
				state.duration = video.value.duration;
			};

			return {
				state,
				video,
				onWatchAnswer,
				onAddComments,
				onScrub,
				onAddMore,
				onNextQuestion,
				onTimeUpdate,
				onVideoCanPlay,
			}
		}
	};
</script>
