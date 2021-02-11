<template>
	<div
		:class="[
			'flex items-center justify-end space-x-4',
			'flex-row-reverse space-x-reverse',
			'rounded-lg text-white py-4 px-8',
			confirmed ? 'bg-green' : 'bg-red',
		]"
	>
		<span>{{ confirmed ? 'Appointment confirmed' : 'Something went wrong' }}</span>

		<div
			:class="[
				'flex items-center justify-center',
				'rounded-full border-2 border-white p-2',
			]"
		>
			<icon
				:name="confirmed ? 'check' : 'close'"
				size="w-5 h-5"
			/>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			confirmed: Boolean,
		},
	};
</script>
