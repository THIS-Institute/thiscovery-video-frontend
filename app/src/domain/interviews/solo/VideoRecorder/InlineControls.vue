<template v-if="!hideControls">
	<div class="flex items-end justify-center p-4 space-x-2">
		<template v-if="isReady || isRecording">
			<tooltip
				v-if="isReady"
				:text="userSettings.video ? 'Hide camera' : 'Show Camera'"
			>
				<x-button
					:icons="[
						'camera',
						userSettings.video ? null : 'camera-strike',
					]"
					:class="userSettings.video ? 'e-button--white' : 'e-button--red'"
					:sr-only="userSettings.video ? 'Hide camera' : 'Show Camera'"
					type="icon"
					@click="$emit('toggleCamera')"
				/>
			</tooltip>

			<tooltip
				v-if="isRecording"
				:text="paused ? 'Resume' : 'Pause'"
			>
				<x-button
					:icon="paused ? 'play' : 'pause'"
					:class="paused ? 'e-button--red' : 'e-button--white'"
					:sr-only="paused ? 'Resume' : 'Pause'"
					type="icon"
					@click="handleTogglePause"
				/>
			</tooltip>
		</template>
	</div>
</template>

<script>
	import { ref, computed } from 'vue';
	import { useStore } from 'vuex';
	import { useRecordingState } from './useRecordingState';

	export default {
		props: {
			state: {
				type: Object,
				required: true,
			},
		},

		emits: [
			'toggleCamera',
			'togglePause',
		],

		setup(props, { emit }) {
			const store = useStore();
			const userSettings = computed(() => store.getters['app/getSettings']);

			const {
				isReady,
				isCountdown,
				isRecording,
			} = useRecordingState(props.state);

			const paused = ref(false);

			const handleTogglePause = () => {
				paused.value = !paused.value;

				emit('togglePause', paused.value);
			};

			return {
				userSettings,
				paused,
				isReady,
				isCountdown,
				isRecording,
				handleTogglePause,
			}
		},
	}
</script>
