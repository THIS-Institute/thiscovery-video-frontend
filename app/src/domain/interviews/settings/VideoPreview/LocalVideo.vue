<template>
	<div>
		<video
			ref="localVideoElement"
			autoplay
			playsinline
			class="transform -scale-x-100"
			@play="onVideoPlay"
		/>
		<loading-spinner
			v-if="!videoReady"
		/>
	</div>
</template>

<script>
	import { ref } from 'vue';
	import { useVideoPreview } from './useVideoPreview';

	import LoadingSpinner from '@/components/LoadingSpinner.vue';

	export default {
		components: {
			LoadingSpinner
		},

		setup() {
			const videoReady = ref(false);

			const { localVideoElement } = useVideoPreview();

			const onVideoPlay = () => {
				videoReady.value = true;
			};

			return {
				videoReady,
				localVideoElement,
				onVideoPlay,
			};
		},
	};
</script>
