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
				class="e-h4"
				:icon="{
					name: 'camera',
					size: 'w-6 h-6',
				}"
				text="Live Interview"
			/>

			<h2
				class="e-h-interview"
				v-text="title"
			/>

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
				pill
				@click="confirmSlot"
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
				v-if="confirmed && info"
				class="h-full"
				v-bind="info"
			/>

			<date-picker
				v-else
				class="h-full"
				:submitting="isSubmitting"
				:calendar="calendar"
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
			pill
			@click="confirmSlot"
		/>
	</div>
</template>

<script>
	import { store } from '@/store/index';
	import { computed } from 'vue';

	import DatePicker from '@/components/appointments/DatePicker';
	import SelectedSlot from '@/components/appointments/SelectedSlot';
	import BookingStatus from '@/components/appointments/BookingStatus';
	import AppointmentInfo from '@/components/appointments/AppointmentInfo';

	export default {
		components: {
			DatePicker,
			SelectedSlot,
			BookingStatus,
			AppointmentInfo,
		},

		props: {
			title: {
				type: String,
				required: true,
			},

			calendar: {
				type: Array,
				required: true,
			},

			info: {
				type: Object,
				required: true,
			},
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
