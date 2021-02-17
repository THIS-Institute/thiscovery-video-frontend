<template>
	<div class="bg-black">
		<video
			ref="localVideo"
			autoplay
			playsinline
			class="transform -scale-x-100"
		/>
	</div>
</template>

<script>
	import { ref, shallowReactive, onMounted, onBeforeUnmount } from 'vue';
	import { createLocalVideoTrack } from 'twilio-video';

	export default {
		setup() {
			const localVideo = ref(null);
			const localTrack = shallowReactive({});

			const setupVideoTrack = () => {
				createLocalVideoTrack().then((track) => {
					localTrack.value = track;
					localTrack.value.attach(localVideo.value);
				});
			};

			const destroyVideoTrack = () => {
				localTrack.value.stop();
				const media = localTrack.value.detach();
				media.forEach(element => element.remove());
			};

			onMounted(setupVideoTrack);
			onBeforeUnmount(destroyVideoTrack);

			return { localVideo };
		},
	};
</script>
