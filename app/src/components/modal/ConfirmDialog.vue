<template>
	<h1	class="e-h3 max-w-sm text-center">
		<slot />
	</h1>

	<div class="flex items-center justify-center space-x-4 mt-5">
		<x-button
			title="Cancel"
			class="e-button--red-outline"
			small
			type="pill"
			@click="$emit('cancel')"
		/>

		<x-button
			title="Yes, retake"
			icon="retake"
			class="e-button--red"
			flipped
			small
			type="pill"
			@click="$emit('confirm')"
		/>
	</div>
</template>

<script>
	export default {
		emits: [
			'confirm',
			'cancel',
		],
	};
</script>
