<template>
	<section
		:class="[
			'relative grid grid-cols-10 gap-y-7.5 gap-x-5 items-start',
			'xl:px-17 xl:py-8',
			{
				'pb-16 md:pb-0': isStatusReady,
			},
		]"
	>
		<transition
			leave-active-class="transition-opacity delay-200 duration-500"
			leave-to-class="opacity-0"
		>
			<loading-spinner
				v-if="loading"
				class="bg-white z-2"
			/>
		</transition>

		<div
			:class="[
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
				text="Live Interview"
			/>

			<h2
				class="e-h-interview"
				v-text="taskTitle"
			/>

			<selected-slot :selection="selection" />

			<e-button
				v-if="!isStatusBooked"
				title="Book appointment"
				icon="chevron-right"
				class="e-button--red hidden md:inline-block"
				:disabled="!selection"
				pill
				@click="confirmSelection"
			/>
		</div>

		<div
			:class="[
				'col-span-10 h-full min-h-date-picker-small z-0',
				'md:col-span-6 md:col-start-5 md:min-h-date-picker',
			]"
		>
			<date-picker
				v-if="!loading"
				class="h-full"
				:submitting="isWaiting"
				:calendar="calendar"
			/>
		</div>
	</section>

	<div
		v-if="!loading && !isStatusBooked"
		class="sticky bottom-0 bg-white p-5 -mx-5 mt-2 sm:-mx-10 shadow-sticky md:hidden"
	>
		<e-button
			title="Book appointment"
			icon="chevron-right"
			class="e-button--red"
			:disabled="!selection"
			small
			pill
			@click="confirmSelection"
		/>
	</div>
</template>

<script>
	import { useStore } from 'vuex';
	import { computed, watch } from 'vue';
	import { onBeforeRouteLeave, useRouter } from 'vue-router';

	import messages from '@/messages';
	import { useMessages } from '@/composables/useMessages';
	import { useAppointmentStatus } from './useAppointmentStatus';
	import { ROUTE_APPOINTMENT_STATUS } from '@/routeConstants';

	import DatePicker from './DatePicker';
	import SelectedSlot from './SelectedSlot';
	import LoadingSpinner from '@/components/LoadingSpinner';

	export default {
		components: {
			DatePicker,
			SelectedSlot,
			LoadingSpinner,
		},

		props: {
			loading: Boolean,
		},

		setup() {
			const store = useStore();
			const router = useRouter();
			const calendar = computed(() => store.state.appointments.availability);
			const isWaiting = computed(() => store.state.appointments.isWaiting);
			const isConfirmed = computed(() => store.state.appointments.isConfirmed);
			const taskTitle = computed(() => store.state.task.title);
			const selection = computed(() => store.state.appointments.selection);

			onBeforeRouteLeave(() => {
				store.dispatch('appointments/syncBookedStatus');
			});

			const confirmSelection = () => {
				store.dispatch('appointments/confirmSelectedSlot');
			};

			const {
				isStatusReady,
				isStatusBooked,
			} = useAppointmentStatus();

			const { message } = useMessages(messages);

			watch(isStatusBooked, () => {
				router.push({ name: ROUTE_APPOINTMENT_STATUS });
			});

			return {
				message,
				taskTitle,
				isWaiting,
				isConfirmed,
				confirmSelection,
				selection,
				calendar,
				isStatusReady,
				isStatusBooked,
			};
		},
	};
</script>
