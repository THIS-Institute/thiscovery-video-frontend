<template>
	<component
		:is="url ? 'router-link' : 'button'"
		:to="url"
		:class="[
			'inline-flex items-center leading-reduced',
			'transition-all duration-300',
			'focus:outline-none',
			{
				'flex-row-reverse space-x-reverse': flipped,
				'text-sm': small,
				'space-x-1/2em rounded-full border-2 disabled:bg-grey-200 disabled:text-white disabled:border-grey-200': pill,
				'rounded-lg py-4 px-3.5': time,
				'space-x-1/3em disabled:text-black disabled:opacity-25': !pill,
				'px-5 py-3.5': pill && small,
				'px-6 py-4': pill && !small,
				'rounded-full p-4 border': (icon || icons) && !title,
			},
		]"
		:disabled="$attrs.disabled"
	>
		<span
			v-if="title"
			v-text="title"
		/>

		<icon
			v-if="icon || icons"
			:name="icon"
			:names="icons"
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
				type: [String,Object],
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
