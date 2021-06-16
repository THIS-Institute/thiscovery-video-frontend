<template v-if="!hideControls">
	<div class="flex items-end justify-center p-4 space-x-2">
		<template v-if="isReady || isRecording">
			<tooltip
				v-if="isReady"
				:text="options.hidden ? 'Show camera' : 'Hide Camera'"
			>
				<x-button
					:icons="[
						'camera',
						options.hidden ? 'camera-strike' : null
					]"
					:class="options.hidden ? 'e-button--red' : 'e-button--white'"
					type="icon"
					@click="handleToggleCamera"
				/>
			</tooltip>

			<tooltip
				v-if="isRecording"
				:text="options.paused ? 'Resume' : 'Pause'"
			>
				<x-button
					:icon="options.paused ? 'play' : 'pause'"
					:class="options.paused ? 'e-button--red' : 'e-button--white'"
					type="icon"
					@click="handleTogglePause"
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
			'togglePause',
		],

		setup(props, { emit }) {
			const options = reactive({
				hidden: false,
				paused: false,
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

			const handleTogglePause = () => {
				options.paused = !options.paused;

				emit('togglePause', options.paused);
			};

			return {
				options,
				isReady,
				isCountdown,
				isRecording,
				handleToggleCamera,
				handleTogglePause,
			}
		},
	}
</script>
