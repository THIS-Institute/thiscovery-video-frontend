<template>
	<section class="e-container my-12 md:my-18 xl:my-24">
		<div class="relative xl:w-20/24 xl:left-2/24">
			<h1
				class="e-h2"
				v-text="message('live.appointments.title')"
			/>

			<p
				class="mt-2"
				v-text="message('live.appointments.content')"
			/>

			<hr class="e-divider mt-5 border-0 xl:hidden">

			<div class="e-content relative mt-12 xl:mt-7">
				<appointment-slots v-bind="slots" />
			</div>
		</div>
	</section>
</template>

<script>
	import messages from '@/messages';
	import { useMessages } from '@/composables/useMessages';
	import AppointmentSlots from '@/components/appointments/AppointmentSlots';

	export default {
		components: {
			AppointmentSlots,
		},

		props: {
			slots: {
				type: Object,
				default: null,
			},
		},

		setup() {
			const { message } = useMessages(messages);

			return { message }
		},
	};
</script>
