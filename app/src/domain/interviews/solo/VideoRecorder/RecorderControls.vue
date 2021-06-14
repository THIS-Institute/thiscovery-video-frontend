<template>
	<div
		:class="[
			'relative z-10',
			'flex flex-wrap items-center justify-between',
			'min-h-controls',
			'gap-y-5 p-5 shadow-md',
		]"
	>
		<e-button
			v-if="isReady"
			title="Click to record your answer"
			icon="record"
			class="e-button--red mx-auto"
			flipped
			small
			pill
			@click="$emit('startRecording')"
		/>

		<e-button
			v-else-if="isCountdown"
			title="Cancel"
			class="e-button--white-outline mx-auto"
			small
			pill
			@click="$emit('cancelCountdown')"
		/>

		<e-button
			v-else-if="isRecording"
			title="Stop recording"
			icon="stop"
			class="e-button--white-outline mx-auto"
			flipped
			small
			pill
			@click="$emit('stopRecording')"
		/>
	</div>
</template>

<script>
	import { useRecordingState } from './useRecordingState';

	export default {
		props: {
			state: {
				type: Object,
				default: () => {
					return {};
				},
				required: true,
			},
		},

		emits: [
			'startRecording',
			'stopRecording',
			'cancelCountdown',
		],

		setup(props) {
			const {
				isReady,
				isCountdown,
				isRecording,
			} = useRecordingState(props.state);

			return {
				isReady,
				isCountdown,
				isRecording,
			}
		},
	}
</script>
