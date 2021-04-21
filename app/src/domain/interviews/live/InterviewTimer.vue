<template>
	<div
		:class="[
			'flex items-center rounded-lg shadow-sticky',
			'bg-grey-400 text-white',
			'px-5 py-4 space-x-2 e-h4',
		]"
	>
		<icon
			class="e-h3"
			name="clock"
		/>

		<p v-text="from" />
	</div>
</template>

<script>
	export default {
		props: {
			from: {
				type: String,
				default: '00:00',
			},
		},
	};
</script>
