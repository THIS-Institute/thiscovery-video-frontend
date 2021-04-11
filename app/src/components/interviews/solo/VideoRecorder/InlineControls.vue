<template v-if="!hideControls">
	<div class="flex items-end justify-center p-4 space-x-2">
		<template v-if="isReady || isRecording">
			<tooltip :text="options.hidden ? 'Show camera' : 'Hide Camera'">
				<e-button
					:icons="[
						'camera',
						options.hidden ? 'camera-strike' : null
					]"
					:class="options.hidden ? 'e-button--red' : 'e-button--white'"
					@click="handleToggleCamera"
				/>
			</tooltip>

			<tooltip :text="options.muted ? 'Unmute microphone' : 'Mute microphone'">
				<e-button
					:icons="[
						'audio-base',
						options.muted ? 'audio-off' : 'audio-sound'
					]"
					:class="options.muted ? 'e-button--red' : 'e-button--white'"
					@click="handleToggleMicrophone"
				/>
			</tooltip>
		</template>
	</div>
</template>

<script>
	import { reactive } from 'vue';
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
			'toggleMicrophone',
		],

		setup(props, { emit }) {
			const options = reactive({
				hidden: false,
				muted: false,
			});

			const {
				isReady,
				isCountdown,
				isRecording,
			} = useRecordingState(props.state);

			const handleToggleCamera = () => {
				emit('toggleCamera');
				options.hidden = !options.hidden;
			};

			const handleToggleMicrophone = () => {
				emit('toggleMicrophone');
				options.muted = !options.muted;
			};

			return {
				options,
				isReady,
				isCountdown,
				isRecording,
				handleToggleCamera,
				handleToggleMicrophone,
			}
		},
	}
</script>
