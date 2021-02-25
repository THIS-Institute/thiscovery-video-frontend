<template>
	<div class="group relative">
		<div
			v-if="!hidden"
			:class="[
				'absolute left-1/2',
				'transform -translate-x-1/2',
				'bg-black bg-opacity-80 rounded-lg',
				'py-1.5 px-2.5',
				'hidden group-hover:block',
				bottom ? 'top-full mt-1' : 'bottom-full mb-1',
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

			hidden: Boolean,
			bottom: Boolean,
		},
	};
</script>
