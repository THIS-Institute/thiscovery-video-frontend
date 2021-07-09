<template>
	<h1
		class="e-h3 text-center"
		v-text="title"
	/>

	<div class="flex items-center justify-center space-x-4 mt-5">
		<x-button
			v-bind="negative"
			class="e-button--red-outline"
			small
			type="pill"
			@click="$emit('cancel')"
		/>

		<x-button
			v-bind="affirmative"
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
		props: {
			negative: {
				type: Object,
				default: () => ({
					title: 'Cancel',
				}),
			},

			affirmative: {
				type: Object,
				default: () => ({
					title: 'Yes, retake',
					icon: 'retake',
				}),
			},

			title: {
				type: String,
				required: true,
			},
		},

		emits: [
			'confirm',
			'cancel',
		],
	};
</script>
