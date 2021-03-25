<template>
	<template v-if="timeslot && !confirmed">
		<div
			:class="[
				'grid grid-cols-2 items-center justify-around',
				'border border-grey-200 rounded-lg',
				'text-sm lg:text-lg',
			]"
		>
			<div class="flex items-center justify-center space-x-2 px-4 py-5">
				<icon
					class="text-red"
					name="calendar"
				/>

				<p
					class="font-bold whitespace-nowrap"
					v-text="asFormattedDate(timeslot)"
				/>
			</div>

			<div class="flex items-center justify-center space-x-2 px-6 py-5 border-l border-grey-200">
				<icon
					class="text-red"
					name="clock"
				/>

				<p
					class="font-bold whitespace-nowrap"
					v-text="asFormattedTime(timeslot)"
				/>
			</div>
		</div>

		<p
			class="text-sm mt-4.5"
			v-text="change"
		/>
	</template>

	<div
		v-else-if="!timeslot"
		class="py-7 px-7.5 border border-grey-200 rounded-lg"
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
		v-else
		class="py-7 px-7.5 border border-grey-200 rounded-lg"
	>
		<p
			class="text-sm"
			v-text="confirmation"
		/>

		<p
			class="font-bold mt-1"
			v-text="`${asFormattedDate(timeslot)}, ${asFormattedTime(timeslot)}`"
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

	export default {
		props: {
			timeslot: {
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

			return {
				asFormattedDate,
				asFormattedTime,
				...message('live.selectedSlot'),
			};
		},
	};
</script>
