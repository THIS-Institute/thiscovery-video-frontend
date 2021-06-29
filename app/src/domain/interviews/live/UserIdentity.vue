<template>
	<div class="flex items-center space-x-2.5 p-4 text-white">
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

	export default {
		components: {
			AudioWave,
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
