<template>
	<section
		:class="[
			'grid grid-cols-10 gap-y-7.5 gap-x-5 items-center',
			'xl:rounded-lg xl:bg-white',
			'xl:px-17 xl:py-8',
			{
				'pb-16 md:pb-0': !confirmed,
			},
		]"
	>
		<div class="col-span-10 space-y-5 md:col-span-4 xl:max-w-83">
			<icon-text
				icon="camera"
				text="Live Interview"
				class="font-bold"
			/>

			<h1 class="e-h-interview">Suggest recommendation for good practice</h1>

			<booking-status
				v-if="confirmed"
				:confirmed="confirmed"
			/>

			<selected-slot
				:date="date"
				:confirmed="confirmed"
			/>

			<e-button
				v-if="!confirmed"
				title="Book appointment"
				:icon="isSubmitting ? 'loading' : 'chevron-right'"
				class="e-button--red hidden md:inline-block"
				:disabled="!date"
				@click.native="confirmSlot"
				pill
			/>
		</div>

		<div
			:class="[
				'col-span-10 h-full',
				confirmed
					? 'md:col-span-5 md:col-start-6'
					: 'md:col-span-6 md:col-start-5',
			]"
		>
			<appointment-info
				v-if="confirmed"
				class="h-full"
			/>

			<date-picker
				v-else
				class="h-full"
				:submitting="isSubmitting"
			/>
		</div>
	</section>

	<div
		v-if="!confirmed"
		class="sticky bottom-0 bg-white p-5 -mx-5 sm:-mx-10 shadow-sticky md:hidden"
	>
		<e-button
			title="Book appointment"
			:icon="isSubmitting ? 'loading' : 'chevron-right'"
			class="e-button--red"
			:disabled="!date"
			@click.native="confirmSlot"
			pill
		/>
	</div>
</template>

<script>
	import { store } from '@/store/index';
	import { computed } from 'vue';

	import DatePicker from '@/components/block/DatePicker';
	import SelectedSlot from '@/components/block/SelectedSlot';
	import BookingStatus from '@/components/block/BookingStatus';
	import AppointmentInfo from '@/components/block/AppointmentInfo';

	export default {
		components: {
			DatePicker,
			SelectedSlot,
			BookingStatus,
			AppointmentInfo,
		},

		setup() {
			const isSubmitting = computed(() => store.state.task.isSubmitting);
			const confirmed = computed(() => store.state.task.confirmed);

			const confirmSlot = () => store.commit('task/confirmSlot');

			const date = computed(() => {
				if (!store.state.task.timeslot) return;

				return store.state.task.timeslot;
			});

			return {
				isSubmitting,
				confirmed,
				confirmSlot,
				date,
			};
		},
	};
</script>
