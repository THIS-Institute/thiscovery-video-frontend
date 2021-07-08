<template>
	<placeholder
		ratio="pt-3/4"
		class="bg-grey-400"
	>
		<local-video v-if="userSettings.video" />

		<video-placeholder
			v-else
			:user-name="userIntials"
		/>

		<video-controls
			:forced-microphone="forcedMicrophone"
			:camera-enabled="userSettings.video"
			:microphone-enabled="userSettings.audio"
			@toggle-camera="onToggleCamera"
			@toggle-mute="onToggleMute"
		/>
	</placeholder>
</template>

<script>
	import { useUser } from '@/auth/useUser';
	import { useStore } from 'vuex';
	import { computed } from 'vue';

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
			const store = useStore();

			const { userIntials } = useUser();
			const userSettings = computed(() => store.getters['app/getSettings']);

			const onToggleCamera = () => store.commit('app/toggleCamera');
			const onToggleMute = () => store.commit('app/toggleMicrophone');

			return {
				userSettings,
				onToggleCamera,
				onToggleMute,
				userIntials,
			}
		},
	};
</script>
