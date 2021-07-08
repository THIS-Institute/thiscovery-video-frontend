<template>
	<div class="flex items-end justify-center p-4 space-x-2">
		<tooltip :text="cameraEnabled ? 'Disable camera' : 'Enable Camera'">
			<x-button
				:icons="[
					'camera',
					cameraEnabled ? null : 'camera-strike'
				]"
				:class="cameraEnabled ? 'e-button--white' : 'e-button--red'"
				:sr-only="cameraEnabled ? 'Disable camera' : 'Enable Camera'"
				type="icon"
				@click="$emit('toggleCamera', cameraEnabled)"
			/>
		</tooltip>

		<tooltip
			v-if="!forcedMicrophone"
			:text="microphoneEnabled ? 'Mute microphone' : 'Unmute microphone'"
		>
			<x-button
				:icons="[
					'microphone',
					microphoneEnabled ? null : 'microphone-strike',
				]"
				:class="microphoneEnabled ? 'e-button--white' : 'e-button--red'"
				:sr-only="microphoneEnabled ? 'Mute microphone' : 'Unmute microphone'"
				type="icon"
				@click="$emit('toggleMute', microphoneEnabled)"
			/>
		</tooltip>
	</div>
</template>

<script>
	export default {
		props: {
			userName: {
				type: String,
				default: null,
			},

			cameraEnabled: Boolean,
			microphoneEnabled: Boolean,
			forcedMicrophone: Boolean,
		},

		emits: [
			'toggleCamera',
			'toggleMute',
		],
	}
</script>
