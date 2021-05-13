<template>
	<video
		ref="localVideoElement"
		autoplay
		playsinline
		class="transform -scale-x-100"
		@play="onVideoPlay"
	/>

	<transition
		enter-active-class="transition-opacity ease-out duration-300"
		leave-active-class="transition-opacity ease-in delay-100 duration-300"
		enter-from-class="opacity-0"
		leave-to-class="opacity-0"
	>
		<loading-spinner
			v-if="!videoReady"
			class="bg-grey-400 z-1"
			:light="true"
		/>
	</transition>
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
