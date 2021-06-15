<template>
	<template v-if="selection && !isStatusBooked">
		<div
			:class="[
				'grid grid-cols-2 items-center justify-around',
				'border border-grey-200 rounded-lg',
				'text-sm xs:text-lg',
			]"
		>
			<div class="flex items-center justify-center space-x-2 px-4 py-5">
				<icon
					class="text-red"
					name="calendar"
				/>

				<p
					class="font-bold whitespace-nowrap"
					v-text="asFormattedDate(selection)"
				/>
			</div>

			<div class="flex items-center justify-center space-x-2 px-6 py-5 border-l border-grey-200">
				<icon
					class="text-red"
					name="clock"
				/>

				<p
					class="font-bold whitespace-nowrap"
					v-text="asFormattedTime(selection)"
				/>
			</div>
		</div>

		<p
			class="text-sm mt-4.5"
			v-text="change"
		/>
	</template>

	<div
		v-else-if="!selection"
		class="py-7 px-7 border border-grey-200 rounded-lg"
	>
		<h1
			class="font-bold text-red"
			v-text="title"
		/>

		<p
			class="text-sm mt-1"
			v-text="content"
		/>
	</div>

	<div
		v-if="isStatusBooked"
		class="py-7 px-7 border border-grey-200 rounded-lg"
	>
		<p
			class="text-sm"
			v-text="confirmation"
		/>

		<p
			class="font-bold mt-1"
			v-text="`${asFormattedDate(selection)}, ${asFormattedTime(selection)}`"
		/>

		<e-button
			title="Add to calendar"
			icon="calendar"
			class="e-button--red-outline mt-2.5"
			flipped
			pill
			@click="$emit('add-to-calendar')"
		/>
	</div>
</template>

<script>
	import messages from '@/messages';
	import { useMessages } from '@/composables/useMessages';
	import { useDates } from './useDates';
	import { useAppointmentStatus } from './useAppointmentStatus';

	export default {
		props: {
			selection: {
				type: String,
				default: null,
			},

			confirmed: Boolean,
		},

		emits: [
			'add-to-calendar',
		],

		setup() {
			const { message } = useMessages(messages);
			const { asFormattedDate, asFormattedTime } = useDates();
			const { isStatusReady, isStatusBooked } = useAppointmentStatus();

			return {
				isStatusReady,
				isStatusBooked,
				asFormattedDate,
				asFormattedTime,
				...message('live.selectedSlot'),
			};
		},
	};
</script>
