<template>
	<component
		:is="$props.url ? 'router-link' : 'button'"
		:to="$props.url"
		:class="[
			'inline-flex items-center leading-reduced',
			'transition-all duration-300',
			'focus:outline-none',
			$props.pill ? 'space-x-1/2em' : 'space-x-1/3em',
			{
				'flex-row-reverse space-x-reverse': $props.flipped,
				'text-sm': $props.small,
				'rounded-full ring-2 ring-inset': $props.pill,
				'px-5 py-3.5': $props.pill && $props.small,
				'px-6 py-4': $props.pill && !$props.small,
			},
		]"
	>
		<span v-text="$props.title" />

		<icon
			v-if="$props.icon"
			:name="$props.icon"
		/>
	</component>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: null,
			},

			url: {
				type: String,
				default: null,
			},

			icon: {
				type: String,
				default: null,
			},

			type: {
				type: String,
				default: null,
			},

			flipped: Boolean,
			small: Boolean,
			pill: Boolean,
		},
	};
</script>
