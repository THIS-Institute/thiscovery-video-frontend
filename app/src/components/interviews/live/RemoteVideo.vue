<template>
	<div class="bg-black">
		<video
			ref="videoFeed"
			autoplay
			playsinline
			class="transform -scale-x-100"
		/>
	</div>

	<audio
		ref="audioFeed"
		autoplay
	/>
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

		setup(props) {
			const videoFeed = ref(null);
			const audioFeed = ref(null);
			const isMuted = ref(false);

			const setRemoteTrack = (publication) => {
				if (publication.isSubscribed) {
					setMediaTrack(publication.track);
				}
			};

			const setMediaTrack = (track) => {
				console.log(track);
				if (track.kind === 'video') {
					setVideoTrack(track);
				}

				if (track.kind === 'audio') {
					setAudioTrack(track);
				}
			};

			const setVideoTrack = (track) => {
				track.attach(videoFeed.value);
			};

			const setAudioTrack = (track) => {
				if (track.isEnabled) {
					track.attach(audioFeed.value);
				} else {
					isMuted.value = true;
				}

				track.on('disabled', onAudioMute);
				track.on('enabled', onAudioUnmute);
			};

			const onAudioMute = (track) => {
				track.detach(audioFeed.value);
				isMuted.value = true;
			};

			const onAudioUnmute = (track) => {
				track.attach(videoFeed.value);
				isMuted.value = false;
			};

			onMounted(() => {
				if (props.participant.tracks) {
					props.participant.tracks.forEach(setRemoteTrack);
				}

				props.participant.on('trackSubscribed', setMediaTrack);
			});

			return {
				videoFeed,
				audioFeed,
			}
		},
	};
</script>
