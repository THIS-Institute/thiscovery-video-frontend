<template>
	<div class="flex items-center space-x-4">
		<div class="flex items-center justify-center rounded-full p-2 bg-pink">
			<icon
				:name="icon"
				size="w-8 h-8"
			/>
		</div>

		<p v-text="text" />
	</div>
</template>

<script>
	export default {
		props: {
			text: {
				type: String,
				required: true,
			},

			icon: {
				type: String,
				required: true,
			},
		},
	};
</script>
