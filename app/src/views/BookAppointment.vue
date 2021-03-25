<template>
	<section class="e-container my-12 md:my-18 xl:my-24">
		<div class="relative grid grid-cols-12 gap-5">
			<div class="col-span-12 xl:col-start-2">
				<h1
					class="e-h2"
					v-text="message('live.appointments.title')"
				/>

				<p
					class="mt-2"
					v-text="message('live.appointments.content')"
				/>
			</div>

			<hr class="e-divider mt-5 border-0 xl:hidden">

			<div class="e-content relative gap-5 mt-12 col-span-12 xl:mt-7 xl:col-start-2 xl:col-span-10">
				<appointment-slots v-if="!isLoading" />
				<loading-spinner v-else />
			</div>

			<div
				v-if="isConfirmed"
				class="hidden relative col-span-3 col-start-10 -mt-32 pointer-events-none xl:block"
			>
				<placeholder ratio="pt-paramedic">
					<img
						src="/static/img/decorations/paramedic.svg"
						alt="Paramedic carrying sign reading 'See you soon!'"
					>
				</placeholder>
			</div>
		</div>
	</section>
</template>

<script>
	import { ref, computed } from 'vue';
	import { useStore } from 'vuex';
	import messages from '@/messages';
	import { useMessages } from '@/composables/useMessages';
	import AppointmentSlots from '@/components/appointments/AppointmentSlots';
	import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';

	export default {
		components: { LoadingSpinner, AppointmentSlots },

		setup() {
			const store = useStore();
			const { message } = useMessages(messages);
			const isLoading = ref(false);
			const calendar = computed(() => store.state.task.appointmentCalendar);
			const isConfirmed = computed(() => store.state.task.confirmed);

			const onCalendarInitialised = () => {
				isLoading.value = false;
			};

			if (calendar.value && calendar.value.length == 0) {
				isLoading.value = true;

				store
					.dispatch('task/initAppointmentCalendar')
					.then(onCalendarInitialised);
			}

			return {
				message,
				isConfirmed,
				isLoading,
				calendar,
			}
		},
	};
</script>
