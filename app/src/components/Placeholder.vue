<template>
	<component
		:is="tag"
		class="e-placeholder"
		:class="ratio ? ratio : 'pt-9/16'"
	>
		<slot />
	</component>
</template>

<script>
	export default {
		props: {
			tag: {
				type: String,
				default: 'div',
			},

			ratio: {
				type: String,
				default: null,
			},
		},
	};
</script>
