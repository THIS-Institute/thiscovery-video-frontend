<template>
	<pre v-text="selection" />

	<div class="flex items-center justify-center space-x-4 mt-5">
		<x-button
			title="Close"
			class="e-button--red-outline"
			small
			type="pill"
			@click="$emit('close')"
		/>
	</div>
</template>

<script>
	export default {
		props: {
			selection: {
				type: String,
				required: true,
			},
		},

		emits: [
			'close',
		],
	};
</script>
