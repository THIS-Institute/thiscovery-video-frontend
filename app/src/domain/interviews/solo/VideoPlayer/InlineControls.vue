<template>
	<div class="flex items-end justify-center p-4 space-x-2">
		<template v-if="!isReviewing">
			<tooltip text="Play back">
				<x-button
					icon="play"
					class="e-button--white"
					sr-only="Play back"
					type="icon"
					@click="$emit('watchAnswer')"
				/>
			</tooltip>

			<tooltip text="Add comments">
				<x-button
					icon="scribe"
					class="e-button--white"
					sr-only="Add comments"
					type="icon"
					@click="$emit('addComments')"
				/>
			</tooltip>
		</template>

		<template v-else>
			<tooltip :text="isPlaying ? 'Pause' : 'Play'">
				<x-button
					:icon="isPlaying ? 'pause' : 'play'"
					class="e-button--white"
					:disabled="!canPlay"
					:sr-only="isPlaying ? 'Pause' : 'Play'"
					type="icon"
					@click="$emit('togglePlayback')"
				/>
			</tooltip>

			<tooltip text="Stop">
				<x-button
					icon="stop"
					class="e-button--white"
					sr-only="Stop"
					type="icon"
					@click="$emit('stop')"
				/>
			</tooltip>
		</template>
	</div>
</template>

<script>
	import { useVideoState } from './useVideoState';

	export default {
		emits: [
			'watchAnswer',
			'addComments',
			'togglePlayback',
			'stop',
		],

		setup() {
			const {
				isReviewing,
				isPlaying,
				canPlay,
			} = useVideoState();

			return {
				isReviewing,
				isPlaying,
				canPlay,
			}
		},
	}
</script>
