<template>
	<div class="group inline-flex items-center space-x-2.5">
		<span
			:class="[
				'w-1.5 h-1.5 rounded-full border border-red',
				'transition-color duration-300',
				'group-hover:bg-red',
			]"
		/>

		<a
			class="transition-color duration-300 group-hover:text-red"
			:href="url"
			v-text="title"
		/>
	</div>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				required: true,
			},

			url: {
				type: String,
				required: true,
			},
		},
	};
</script>
