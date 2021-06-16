<template>
	<button
		class="e-button--time justify-center rounded-lg py-4 px-3.5 space-x-1/3em disabled:text-black disabled:opacity-25"
		:class="{
			'text-sm': small,
			'hover:bg-transparent': disabled,
		}"
		:disabled="disabled"
	>
		<span class="inline-block">
			<span
				v-if="srOnly"
				class="sr-only"
				v-text="srOnly"
			/>

			<span v-text="title" />
		</span>
	</button>
</template>

<script>
	export default {
		props: {
			srOnly: {
				type: String,
				default: null,
			},

			title: {
				type: String,
				required: true,
			},

			small: Boolean,
			disabled: Boolean,
		},
	};
</script>
