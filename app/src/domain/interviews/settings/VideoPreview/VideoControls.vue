<template>
	<div class="flex items-end justify-center p-4 space-x-2">
		<tooltip :text="cameraEnabled ? 'Disable camera' : 'Enable Camera'">
			<e-button
				:icons="[
					'camera',
					cameraEnabled ? null : 'camera-strike'
				]"
				:class="cameraEnabled ? 'e-button--white' : 'e-button--red'"
				@click="$emit('toggleCamera', cameraEnabled)"
			/>
		</tooltip>

		<tooltip :text="microphoneEnabled ? 'Mute microphone' : 'Unmute microphone'">
			<e-button
				:icons="[
					'audio-base',
					microphoneEnabled ? 'audio-sound' : 'audio-off'
				]"
				:class="microphoneEnabled ? 'e-button--white' : 'e-button--red'"
				@click="$emit('toggleMute', microphoneEnabled)"
			/>
		</tooltip>
	</div>
</template>

<script>
	export default {
		props: {
			cameraEnabled: {
				type: Boolean,
				required: true,
			},

			microphoneEnabled: {
				type: Boolean,
				required: true,
			},

			userName: {
				type: String,
				default: null,
			}
		},

		emits: [
			'toggleCamera',
			'toggleMute',
		],
	}
</script>
