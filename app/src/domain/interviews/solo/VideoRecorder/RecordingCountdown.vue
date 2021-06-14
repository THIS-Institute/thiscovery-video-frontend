<template>
	<div class="flex flex-col items-center justify-center text-white p-4 bg-black bg-opacity-50">
		<div class="relative">
			<h1
				class="e-h2 text-center"
				v-text="count"
			/>

			<div
				:class="[
					'absolute inset-0 top-1/2 left-1/2 w-10 h-10',
					'transform -translate-x-1/2 -translate-y-1/2 scale-150 md:scale-175',
				]"
			>
				<svg class="absolute inset-0 w-10 h-10 text-black-25">
					<circle
						r="18"
						cx="20"
						cy="20"
						stroke-width="2px"
						stroke="currentColor"
						fill="none"
					/>
				</svg>

				<svg class="absolute inset-0 w-10 h-10 text-green">
					<circle
						r="18"
						cx="20"
						cy="20"
						stroke-width="2px"
						stroke="currentColor"
						fill="none"
						class="animate-countdown"
					/>
				</svg>
			</div>
		</div>

		<h2 class="e-h3 mt-4">
			Get ready to answer
		</h2>
	</div>
</template>

<script>
	import { ref, onBeforeUnmount } from 'vue';

	export default {
		emits: [
			'finish',
		],

		setup(props, { emit }) {
			const count = ref(3);

			onBeforeUnmount(() => {
				clearInterval(interval);
			})

			const updateCounter = () => {
				if (count.value === 1) {
					emit('finish');

					clearInterval(interval);

					return;
				}

				--count.value;
			};

			const interval = setInterval(updateCounter, 1000);

			return { count }
		},
	}
</script>

<style scoped>
	svg {
		transform: rotateY(-180deg) rotateZ(-90deg);
	}

	svg circle {
		stroke-dasharray: 113px;
		stroke-dashoffset: 0px;
		stroke-linecap: round;
	}
</style>

