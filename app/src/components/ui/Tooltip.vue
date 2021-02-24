<template>
	<div class="group relative">
		<div
			:class="[
				'absolute bottom-full left-1/2',
				'transform -translate-x-1/2',
				'bg-black bg-opacity-80 rounded-lg',
				'py-1.5 px-2.5 mb-1',
				'hidden group-hover:block',
			]"
		>
			<p
				class="text-sm text-white whitespace-nowrap"
				v-text="text"
			/>
		</div>

		<slot />
	</div>
</template>

<script>
	export default {
		props: {
			text: {
				type: String,
				required: true,
			},
		},
	};
</script>
