<template>
	<x-button
		title="Add to calendar"
		icon="calendar"
		class="e-button--red-outline"
		flipped
		type="pill"
		v-bind="$attrs"
	/>
</template>

<script>
	export default {
		props: {
			selection: {
				type: String,
				required: true,
			},
		},
	}
</script>
