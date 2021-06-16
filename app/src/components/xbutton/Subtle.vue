<template>
	<component
		:is="element"
		class="space-x-1/3em"
		:class="[
			{
				'text-sm': small,
				'flex-row-reverse space-x-reverse': flipped,
			},
		]"
		v-bind="location"
	>
		<span
			class="inline-block"
			v-text="title"
		/>

		<icon
			v-if="icon || icons"
			:name="icon"
			:names="icons"
			size="w-em h-em"
		/>
	</component>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				required: true,
			},

			element: {
				type: String,
				required: true,
			},

			location: {
				type: [String, Object],
				default: null,
			},

			icon: {
				type: String,
				default: null,
			},

			icons: {
				type: Array,
				default: null,
			},

			small: Boolean,
			flipped: Boolean,
			external: Boolean,
		},
	};
</script>
