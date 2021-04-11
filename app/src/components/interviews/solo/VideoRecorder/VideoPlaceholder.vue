<template>
	<div class="flex items-center justify-center">
		<div
			:class="[
				'flex items-center justify-center',
				'bg-grey-300 text-white rounded-full',
				'w-32 h-32',
			]"
		>
			<h1
				class="e-h4"
				v-text="name"
			/>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			name: {
				type: String,
				default: null,
				required: true,
			},
		},
	};
</script>
