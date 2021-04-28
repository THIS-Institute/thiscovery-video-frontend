<template>
	<div
		v-show="hasVideo"
		class="bg-black"
	>
		<video
			ref="videoFeed"
			autoplay
			playsinline
			class="absolute inset-0 w-full h-full object-cover max-h-screen"
		/>

		<p
			v-if="participant.identity"
			class="fixed bottom-0 left-0 p-4 text-white"
			v-text="participant.identity"
		/>
	</div>

	<div
		v-show="!hasVideo"
		class="bg-grey-400"
	>
		<div
			:class="[
				'flex items-center justify-center',
				'bg-grey-300 text-white rounded-full',
				'w-32 h-32',
			]"
		>
			<h1
				v-if="participant.identity"
				class="e-h4"
				v-text="participant.identity"
			/>
		</div>
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

		emits: [
			'questionReceived',
		],

		setup(props, { emit }) {
			const videoFeed = ref(null);
			const audioFeed = ref(null);
			const isMuted = ref(false);
			const hasVideo = ref(false);

			const setRemoteTrack = (publication) => {
				if (publication.isSubscribed) {
					setMediaTrack(publication.track);
				}
			};

			const setMediaTrack = (track) => {
				if (track.kind === 'video') {
					setVideoTrack(track);
				}

				if (track.kind === 'audio') {
					setAudioTrack(track);
				}

				if (track.kind === 'data') {
					setDataTrack(track);
				}
			};

			const setVideoTrack = (track) => {
				track.attach(videoFeed.value);
				hasVideo.value = track.isEnabled;
				track.on('disabled', onVideoHide);
				track.on('enabled', onVideoUnhide);
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

			const setDataTrack = (track) => {
				track.on('message', onMessageReceived);
			};

			const onMessageReceived = (message) => {
				const response = JSON.parse(message);
				
				if (response.question !== undefined) {
					emit('questionReceived', response.question);
				}
			};

			const onAudioMute = (track) => {
				track.detach(audioFeed.value);
				isMuted.value = true;
			};

			const onAudioUnmute = (track) => {
				track.attach(videoFeed.value);
				isMuted.value = false;
			};

			const onVideoHide = () => {
				hasVideo.value = false;
			};

			const onVideoUnhide = () => {
				hasVideo.value = true;
			};

			onMounted(() => {
				if (props.participant.tracks) {
					props.participant.tracks.forEach(setRemoteTrack);
				}

				props.participant.on('trackSubscribed', setMediaTrack);
			});

			return {
				hasVideo,
				videoFeed,
				audioFeed,
			}
		},
	};
</script>