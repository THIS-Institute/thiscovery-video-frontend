<template>
	<div class="absolute inset-0 w-full h-full flex items-center justify-center py-2">
		<div
			:class="[
				'relative text-xl w-5 h-5 rounded-full animate-spinner',
				'transform scale-50',
				light ? 'text-white' : 'text-red'
			]"
		/>
	</div>
</template>

<script>
	export default {
		props: {
			light: Boolean,
		},
	}
</script>
