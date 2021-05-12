<template>
	<section
		:class="[
			'grid grid-cols-10 gap-y-7.5 gap-x-5 items-start',
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
				:message="message(`live.bookingStatus.${ isConfirmed ? 'success' : 'cancelled'}`)"
				:error="!isConfirmed"
			/>

			<selected-slot
				v-if="isConfirmed"
				:selection="selection"
				confirmed
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
				class="h-full"
				:booked="isStatusBooked"
				@reschedule="invokeReschedule"
				@cancel="invokeCancellation"
			/>
		</div>
	</section>
</template>

<script>
	import { useStore } from 'vuex';
	import { computed } from 'vue';
	import { onBeforeRouteLeave } from 'vue-router';

	import messages from '@/messages';
	import { useMessages } from '@/composables/useMessages';
	import { useAppointmentStatus } from './useAppointmentStatus';

	import SelectedSlot from './SelectedSlot';
	import BookingStatus from './BookingStatus';
	import AppointmentInfo from './AppointmentInfo';

	export default {
		components: {
			SelectedSlot,
			BookingStatus,
			AppointmentInfo,
		},

		setup() {
			const store = useStore();
			const isWaiting = computed(() => store.state.appointments.isWaiting);
			const isConfirmed = computed(() => store.state.appointments.isConfirmed);
			const taskTitle = computed(() => store.state.task.title);
			const selection = computed(() => store.state.appointments.selection);

			onBeforeRouteLeave(() => {
				store.dispatch('appointments/syncBookedStatus');
			})

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
				selection,
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
