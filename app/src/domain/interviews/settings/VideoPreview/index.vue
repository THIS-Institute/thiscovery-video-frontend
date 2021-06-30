<template>
	<placeholder
		ratio="pt-3/4"
		class="bg-grey-400"
	>
		<video-placeholder
			v-if="!cameraEnabled"
			:user-name="userIntials"
		/>
		
		<local-video
			v-if="cameraEnabled"
		/>

		<video-controls
			:forced-microphone="forcedMicrophone"
			:camera-enabled="cameraEnabled"
			:microphone-enabled="microphoneEnabled"
			@toggle-camera="onToggleCamera"
			@toggle-mute="onToggleMute"
		/>
	</placeholder>
</template>

<script>
	import { reactive, toRefs } from 'vue';
	import { useUser } from '@/auth/useUser';

	import LocalVideo from './LocalVideo';
	import VideoPlaceholder from './VideoPlaceholder';
	import VideoControls from './VideoControls';

	export default {
		name: 'VideoPreview',

		components: {
			LocalVideo,
			VideoPlaceholder,
			VideoControls,
		},

		props: {
			forcedMicrophone: Boolean,
		},

		setup() {
			const state = reactive({
				cameraEnabled: true,
				microphoneEnabled: true,
			});

			const { userIntials } = useUser();

			const onToggleCamera = (status) => {
				state.cameraEnabled = !status;
			};

			const onToggleMute = (status) => {
				state.microphoneEnabled = !status;
			};

			return {
				...toRefs(state),
				onToggleCamera,
				onToggleMute,
				userIntials,
			}
		},
	};
</script>
