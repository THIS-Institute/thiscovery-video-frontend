<template>
	<component
		:is="$props.tag"
		class="e-placeholder"
		:class="$props.ratio ? $props.ratio : 'pt-9/16'"
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
