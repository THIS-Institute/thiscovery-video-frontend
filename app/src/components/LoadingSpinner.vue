<template>
	<div class="absolute inset-0 w-full h-full flex items-center justify-center py-2">
		<icon
			name="loading"
			class="animate-spin"
			:class="light ? 'text-white' : 'text-red'"
			size="w-10 h-10"
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
