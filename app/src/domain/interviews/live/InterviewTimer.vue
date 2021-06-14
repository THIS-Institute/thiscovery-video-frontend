<template>
	<div
		:class="[
			'flex items-center rounded-lg shadow-sticky',
			'bg-grey-400 text-white',
			'px-5 py-4 space-x-2 e-h4',
			'w-32',
		]"
	>
		<icon
			class="e-h3"
			name="clock"
		/>

		<p v-text="time" />
	</div>
</template>

<script>
	import { ref } from 'vue';

	export default {
		setup() {
			const time = ref('00:00');

			const start = Date.now();
			
			setInterval(function() {
				const delta = Date.now() - start;
				const totalSeconds = Math.floor(delta/1000);
				const minutes = Math.floor(totalSeconds/60);
				const seconds = totalSeconds - minutes * 60;

				const formattedMinutes = String(minutes).padStart(2, '0');
				const formattedSeconds = String(seconds).padStart(2, '0');

				time.value = `${formattedMinutes}:${formattedSeconds}`;
			}, 1000);

			return {
				time,
			}
		}
	};
</script>
