<template>
	<placeholder
		ratio="pt-3/4"
		class="bg-grey-400"
	>
		<video
			ref="videoElement"
			class="absolute inset-0 w-full h-full object-cover"
			src="/static/img/big-buck-bunny.mp4"
		/>
	</placeholder>

	<video-controls
		@add-more="onAddMore"
		@next-question="onNextQuestion"
	/>
</template>

<script>
	import { ref } from 'vue';
	import VideoControls from './VideoControls';

	export default {
		components: {
			VideoControls,
		},

		props: {
			videoUrl: {
				type: String,
				required: true,
			},
		},

		setup() {
			const videoElement = ref(null);

			const onAddMore = () => {
				console.log('Add more!');
			};

			const onNextQuestion = () => {
				console.log('Next question!');
			};

			return {
				videoElement,
				onAddMore,
				onNextQuestion,
			}
		}
	};
</script>
