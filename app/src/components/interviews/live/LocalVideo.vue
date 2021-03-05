<template>
	<div class="bg-black">
		<video
			ref="videoFeed"
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
			const videoFeed = ref(null);

			const setVideoTrack = (publication) => {
				publication.track.attach(videoFeed.value);
			};

			const setupLocalVideoTrack = () => {
				if (props.participant.videoTracks) {
					props.participant.videoTracks.forEach(setVideoTrack);
				}
			};

			onMounted(setupLocalVideoTrack);

			return { videoFeed }
		},
	};
</script>
