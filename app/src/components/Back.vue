<template>
	<div class="e-container">
		<x-button
			title="Back"
			icon="chevron-left"
			class="text-red hover:text-black active:text-black"
			type="subtle"
			flipped
			@click="back"
		/>
	</div>
</template>

<script>
	import { useRouter } from 'vue-router';

	export default {
		setup () {
			const router = useRouter();

			const back = () => window.history.length > 1
				? router.go(-1)
				: router.push('/');

			return {
				back,
			};
		},
	};
</script>
