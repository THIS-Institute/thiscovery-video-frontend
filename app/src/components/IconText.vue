<template>
	<div class="inline-flex items-center space-x-1/2em">
		<div
			:class="[
				'flex items-center justify-center rounded-full p-1/2em',
				icon.bg ? icon.bg : 'bg-pink',
			]"
		>
			<icon v-bind="icon" />
		</div>

		<component
			:is="tag"
			v-if="text"
			:class="textClass"
			v-text="text"
		/>
	</div>
</template>

<script>
	export default {
		props: {
			text: {
				type: String,
				default: null,
			},

			textClass: {
				type: String,
				default: null,
			},

			icon: {
				type: Object,
				required: true,
			},

			tag: {
				type: String,
				default: 'p',
			},
		},
	};
</script>
