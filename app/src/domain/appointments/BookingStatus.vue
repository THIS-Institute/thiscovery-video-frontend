<template>
	<div
		:class="[
			'flex items-center justify-end space-x-4',
			'flex-row-reverse space-x-reverse',
			'rounded-lg text-white py-4 px-6',
			error ? 'bg-red' : 'bg-green',
		]"
	>
		<span
			class="font-bold text-base"
			v-text="message"
		/>

		<div
			:class="[
				'flex items-center justify-center',
				'rounded-full border-2 border-white p-1',
			]"
		>
			<icon
				name="check"
				size="w-5 h-5"
			/>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			message: {
				type: String,
				default: null,
			},

			error: Boolean,
		},
	};
</script>
