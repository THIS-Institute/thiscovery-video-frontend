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
	import { computed } from 'vue';

	import content from '@/../content.json';

	export default {
		props: {
			confirmed: Boolean,
		},

		setup(props) {
			const status = computed(() => {
				return props.confirmed
					? content.bookingStatus.success
					: content.bookingStatus.failed;
			});

			return {
				status,
			};
		},
	};
</script>
