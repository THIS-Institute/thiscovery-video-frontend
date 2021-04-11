<template v-if="duration">
	<div
		:class="[
			'flex items-center justify-between',
			'space-x-3 px-3 py-1.5 rounded-full',
			'bg-grey-300 text-white text-sm',
		]"
	>
		<p
			class="w-16 text-center"
			v-text="toTime(state.currentTime)"
		/>

		<div class="relative w-full h-1 bg-white rounded-full">
			<input
				v-model="state.currentTime"
				type="range"
				min="0"
				step="any"
				:max="state.duration"
				class="scrubber cursor-pointer"
				@input="$emit('scrub', $event)"
			>

			<span
				class="absolute inset-0 bg-red pointer-events-none origin-left rounded-full"
				:style="progress"
			/>
		</div>

		<p
			class="w-16 text-center"
			v-text="toTime(state.duration)"
		/>
	</div>
</template>

<script>
	import { computed } from 'vue';
	import { useVideoState } from './useVideoState';

	export default {
		emits: [
			'scrub',
		],

		setup() {
			const { state } = useVideoState();

			const progress = computed(() => {
				const asPercentage = state.currentTime / state.duration;

				return {
					transform: `scaleX(${asPercentage.toFixed(3)})`,
				};
			});

			const toTime = (input) => {
				const seconds = parseFloat(input);
				const minutes = Math.floor(seconds / 60);
				return `${minutes}:${(seconds.toFixed(0) < 10 ? '0': '')}${seconds.toFixed(0)}`;
			};

			return {
				state,
				progress,
				toTime,
			};
		},
	};
</script>
