<template>
	<h1	class="e-h3 max-w-sm text-center">
		Are you sure you want to delete your recording and retake?
	</h1>

	<div class="flex items-center justify-center space-x-4 mt-5">
		<e-button
			title="Cancel"
			class="e-button--red-outline"
			small
			pill
			@click="$emit('cancel')"
		/>

		<e-button
			title="Yes, retake"
			icon="retake"
			class="e-button--red"
			flipped
			small
			pill
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
