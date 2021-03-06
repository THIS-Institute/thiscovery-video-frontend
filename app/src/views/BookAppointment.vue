<template>
	<section class="e-container mt-12 md:my-18 xl:my-24">
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

			<transition
				enter-active-class="transform transition-all ease-out duration-300"
				leave-active-class="transform transition-all ease-in duration-200"
				enter-from-class="opacity-0 translate-y-4 sm:scale-95"
				leave-to-class="opacity-0 translate-y-4 sm:scale-95"
				appear
			>
				<div
					:class="[
						'e-content relative gap-5 mt-12 col-span-12',
						'xl:mt-7 xl:col-start-2 xl:col-span-10',
						'xl:rounded-lg xl:overflow-hidden xl:bg-white',
					]"
				>
					<appointment-slots :loading="isLoading" />
				</div>
			</transition>
		</div>
	</section>
</template>

<script>
	import { ref, computed } from 'vue';
	import { useStore } from 'vuex';
	import messages from '@/messages';
	import { useMessages } from '@/composables/useMessages';
	import AppointmentSlots from '@/domain/appointments/AppointmentSlots';

	export default {
		components: {
			AppointmentSlots,
		},

		setup() {
			const store = useStore();
			const { message } = useMessages(messages);
			const isLoading = ref(false);
			const calendar = computed(() => store.state.appointments.availability);
			const isConfirmed = computed(() => store.state.appointments.isConfirmed);

			const onCalendarInitialised = () => {
				isLoading.value = false;
			};

			if (calendar.value && calendar.value.length == 0) {
				isLoading.value = true;

				store
					.dispatch('appointments/initAppointmentCalendar')
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
