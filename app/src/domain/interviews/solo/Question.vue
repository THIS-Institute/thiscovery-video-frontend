<template>
	<icon-text
		tag="h2"
		:icon="{
			name: 'question',
			size: 'w-6 h-6',
		}"
		:text="name"
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

			id: {
				type: String,
				default: null,
			},

			name: {
				type: String,
				default: null,
			},

			sequence: {
				type: String,
				default: null,
			},
		},
	};
</script>
