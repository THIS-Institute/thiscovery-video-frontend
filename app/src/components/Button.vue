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
				'rounded-full p-3.5 border': (icon || icons) && !title,
			},
		]"
		:disabled="$attrs.disabled"
	>
		<div
			v-if="title"
			class="inline-block"
		>
			<span
				v-if="srOnly"
				class="sr-only"
				v-text="srOnly"
			/>

			<span v-text="title" />
		</div>

		<icon
			v-if="icon || icons"
			:name="icon"
			:names="icons"
			:size="!title ? 'w-1.25em h-1.25em' : 'w-em h-em'"
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

			srOnly: {
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
