<template>
	<icon-text
		icon="question"
		:text="`Question ${number}`"
		class="e-h4"
	/>

	<h3
		class="e-h3 mt-7.5"
		v-text="title"
	/>

	<p
		class="text-sm mt-2.5"
		v-text="description"
	/>
</template>

<script>
	export default {
		props: {
			number: {
				type: Number,
				default: null,
			},

			title: {
				type: String,
				default: null,
			},

			description: {
				type: String,
				default: null,
			},
		},
	};
</script>
