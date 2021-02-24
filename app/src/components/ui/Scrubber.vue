<template>
	<div
		:class="[
			'flex items-center justify-between',
			'space-x-3 px-3 py-1.5 rounded-full',
			'bg-grey-300 text-white text-sm',
		]"
	>
		<p
			class="w-16 text-center"
			v-text="toTime(position)"
		/>

		<div class="relative w-full h-1 bg-white rounded-full">
			<input
				v-model="position"
				type="range"
				min="0"
				:max="duration"
				class="scrubber"
				@change="onScrub"
			>

			<span
				class="absolute inset-0 bg-red pointer-events-none origin-left rounded-full"
				:style="progress"
			/>
		</div>

		<p
			class="w-16 text-center"
			v-text="toTime(duration)"
		/>
	</div>
</template>

<script>
	import { reactive, toRefs, computed } from 'vue';

	export default {
		props: {
			start: {
				type: Number,
				default: 0,
			},

			duration: {
				type: Number,
				default: 192000,
			},
		},

		setup(props) {
			const state = reactive({
				position: props.start,
			});

			const progress = computed(() => {
				const asPercentage = state.position / props.duration;

				return {
					transform: `scaleX(${asPercentage.toFixed(3)})`,
				};
			});

			const toTime = (milliseconds) => {
				const minutes = Math.floor(milliseconds / 60000);
				const seconds = ((milliseconds % 60000) / 1000).toFixed(0);

				return `${minutes}:${(seconds < 10 ? '0': '')}${seconds}`;
			};

			const onScrub = () => console.log('Scrubbed!');

			return {
				...toRefs(state),
				progress,
				onScrub,
				toTime,
			};
		},
	};
</script>
