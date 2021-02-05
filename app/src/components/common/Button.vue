<template>
	<component
		:is="$props.url ? 'router-link' : 'button'"
		:to="$props.url"
		:class="[
			'inline-flex items-center leading-reduced',
			'transition-all duration-300',
			'focus:outline-none',
			{
				'flex-row-reverse space-x-reverse': $props.flipped,
				'text-sm': $props.small,
				'space-x-1/2em rounded-full border-2 disabled:bg-grey-200 disabled:text-white disabled:border-grey-200': $props.pill,
				'rounded-lg py-4 px-3.5': $props.time,
				'space-x-1/3em disabled:text-black disabled:opacity-25': !$props.pill,
				'px-5 py-3.5': $props.pill && $props.small,
				'px-6 py-4': $props.pill && !$props.small,
			},
		]"
		:disabled="$attrs.disabled"
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
			time: Boolean,
		},
	};
</script>
