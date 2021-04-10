<template>
	<div class="flex flex-col items-center justify-center text-white p-4 bg-black bg-opacity-50">
		<h1
			class="e-h2"
			v-text="count"
		/>

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

