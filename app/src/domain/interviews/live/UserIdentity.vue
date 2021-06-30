<template>
	<div class="flex items-center space-x-2.5 p-4 text-white">
		<recording-indicator />

		<icon
			v-if="isMuted"
			class="text-red"
			:names="[
				'microphone',
				'microphone-strike',
			]"
		/>

		<audio-wave
			v-else
			:is-speaking="isSpeaking"
		/>

		<p v-text="name" />
	</div>
</template>

<script>
	import AudioWave from '@/components/AudioWave';
	import RecordingIndicator from '@/components/RecordingIndicator';

	export default {
		components: {
			AudioWave,
			RecordingIndicator,
		},

		props: {
			name: {
				type: String,
				required: true,
			},

			isSpeaking: Boolean,
			isMuted: Boolean,
		},
	};
</script>
