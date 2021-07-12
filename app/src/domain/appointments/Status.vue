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
		<div
			:class="[
				'flex flex-col',
				'col-span-10 space-y-5',
				'md:col-span-4 md:mt-10',
				'xl:max-w-83',
			]"
		>
			<icon-text
				class="e-h4"
				:icon="{
					name: 'camera',
					size: 'w-6 h-6',
				}"
				:text="message('live.title')"
			/>

			<h2
				class="e-h-interview"
				v-text="taskTitle"
			/>

			<booking-status
				:message="message(`live.bookingStatus.title.${ isConfirmed ? 'success' : 'cancelled'}`)"
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
				@cancel="openConfirmDialog"
			/>
		</div>
	</section>
</template>

<script>
	import { useStore } from 'vuex';
	import { computed } from 'vue';
	import { useRouter } from 'vue-router';
	import { ROUTE_APPOINTMENTS } from '@/routeConstants';

	import messages from '@/messages';
	import { useMessages } from '@/composables/useMessages';
	import { useAppointmentStatus } from './useAppointmentStatus';

	import modals from '@/modals';

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
			const router = useRouter();
			const isWaiting = computed(() => store.state.appointments.isWaiting);
			const isConfirmed = computed(() => store.state.appointments.isConfirmed);
			const taskTitle = computed(() => store.state.task.title);
			const selection = computed(() => store.state.appointments.selection);

			const openConfirmDialog = () => {
				const callbacks = {
					confirm: () => {
						store.dispatch('appointments/cancel');
						store.dispatch('app/closeModal');
					},
				};

				store.dispatch('app/openModal', { ...modals.cancel, callbacks });
			};

			const invokeReschedule = () => {
				store.dispatch('appointments/reschedule');
				router.push({ name: ROUTE_APPOINTMENTS });
			};

			const {
				isStatusReady,
				isStatusBooked,
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
				isStatusReady,
				isStatusBooked,
				isStatusCancelled,
				openConfirmDialog,
			};
		},
	};
</script>
