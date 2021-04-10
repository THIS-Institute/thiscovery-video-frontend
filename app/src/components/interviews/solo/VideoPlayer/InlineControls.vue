<template>
	<div class="flex items-end justify-center p-4 space-x-2">
		<template v-if="!isReviewing">
			<tooltip text="Watch answer">
				<e-button
					icon="play"
					class="e-button--white"
					@click="$emit('watchAnswer')"
				/>
			</tooltip>

			<tooltip text="Add comments">
				<e-button
					icon="scribe"
					class="e-button--white"
					@click="$emit('addComments')"
				/>
			</tooltip>
		</template>

		<template v-else>
			<e-button
				:icon="isPlaying ? 'pause' : 'play'"
				class="e-button--white"
				@click="$emit('togglePlayback')"
			/>
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
		],

		setup() {
			const {
				isReviewing,
				isPlaying,
			} = useVideoState();

			return {
				isReviewing,
				isPlaying,
			}
		},
	}
</script>
