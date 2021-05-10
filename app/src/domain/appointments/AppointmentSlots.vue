<template>
	<section
		:class="[
			'grid grid-cols-10 gap-y-7.5 gap-x-5 items-start',
			'xl:rounded-lg xl:bg-white',
			'xl:px-17 xl:py-8',
			{
				'pb-16 md:pb-0': isStatusReady,
			},
		]"
	>
		<div class="col-span-10 space-y-5 md:col-span-4 md:mt-10 xl:max-w-83">
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
				v-text="taskTitle"
			/>

			<booking-status
				v-if="isStatusBooked"
				:message="message('live.bookingStatus.success')"
			/>

			<booking-status
				v-if="isStatusCancelled"
				:message="message('live.bookingStatus.cancelled')"
				error
			/>

			<selected-slot
				:selection="selection"
				:confirmed="isConfirmed"
			/>

			<e-button
				v-if="!isStatusBooked"
				:title="(isStatusRescheduling) ? 'Reschedule appointment' : 'Book appointment'"
				icon="chevron-right"
				class="e-button--red hidden md:inline-block"
				:disabled="!selection"
				pill
				@click="confirmSelection"
			/>
		</div>

		<div
			:class="[
				'col-span-10 h-full',
				isStatusBooked
					? 'md:col-span-5 md:col-start-6'
					: 'md:col-span-6 md:col-start-5',
			]"
		>
			<appointment-info
				v-if="isStatusBooked"
				class="h-full"
				@reschedule="invokeReschedule"
				@cancel="invokeCancellation"
			/>

			<date-picker
				v-else
				class="h-full"
				:submitting="isWaiting"
				:calendar="calendar"
			/>
		</div>
	</section>

	<div
		v-if="!isStatusBooked"
		class="sticky bottom-0 bg-white p-5 -mx-5 sm:-mx-10 shadow-sticky md:hidden"
	>
		<e-button
			:title="(isStatusRescheduling) ? 'Reschedule appointment' : 'Book appointment'"
			icon="chevron-right"
			class="e-button--red"
			:disabled="!selection"
			pill
			@click="confirmSelection"
		/>
	</div>
</template>

<script>
	import { useStore } from 'vuex';
	import { computed } from 'vue';
	import { onBeforeRouteLeave } from 'vue-router';
	import messages from '@/messages';
	import { useMessages } from '@/composables/useMessages';
	import { useAppointmentStatus } from './useAppointmentStatus';
	import DatePicker from './DatePicker';
	import SelectedSlot from './SelectedSlot';
	import BookingStatus from './BookingStatus';
	import AppointmentInfo from './AppointmentInfo';

	export default {
		components: {
			DatePicker,
			SelectedSlot,
			BookingStatus,
			AppointmentInfo,
		},

		setup() {
			const store = useStore();
			const calendar = computed(() => store.state.appointments.availability);
			const isWaiting = computed(() => store.state.appointments.isWaiting);
			const isConfirmed = computed(() => store.state.appointments.isConfirmed);
			const taskTitle = computed(() => store.state.task.title);
			const selection = computed(() => store.state.appointments.selection);

			onBeforeRouteLeave(() => {
				store.dispatch('appointments/syncBookedStatus');
			})

			const confirmSelection = () => store.dispatch('appointments/confirmSelectedSlot');

			const invokeReschedule = () => {
				store.dispatch('appointments/reschedule');
			};

			const invokeCancellation = () => {
				if (!confirm('Are you sure you want to cancel your appointment?')) {
					return;
				}

				store.dispatch('appointments/cancel')
					.then(onAppointmentCancelled)
			};

			const onAppointmentCancelled = () => {};

			const {
				isStatusReady,
				isStatusBooked,
				isStatusRescheduling,
				isStatusCancelled,
			} = useAppointmentStatus();

			const { message } = useMessages(messages);

			return {
				message,
				taskTitle,
				isWaiting,
				isConfirmed,
				confirmSelection,
				selection,
				calendar,
				invokeReschedule,
				invokeCancellation,
				isStatusReady,
				isStatusBooked,
				isStatusRescheduling,
				isStatusCancelled,
			};
		},
	};
</script>
