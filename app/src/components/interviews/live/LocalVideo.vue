<template>
	<div class="bg-black">
		<video
			ref="localVideoElement"
			autoplay
			playsinline
			class="transform -scale-x-100"
		/>
	</div>
</template>

<script>
	import { ref, onMounted } from 'vue';

	export default {
		props: {
			participant: {
				type: Object,
				required: true,
			},
		},

		setup (props) {
			const localVideoElement = ref(null);

			const setVideoTrack = (publication) => {
				publication.track.attach(localVideoElement.value);
			};

			const setupLocalVideoTrack = () => {
				if (props.participant.videoTracks) {
					props.participant.videoTracks.forEach(setVideoTrack);
				}
			};

			onMounted(setupLocalVideoTrack);

			return { localVideoElement }
		},
	};
</script>
