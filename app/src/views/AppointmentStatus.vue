<template>
	<section class="e-container my-12 md:my-18 xl:my-24">
		<div class="relative grid grid-cols-12 gap-5">
			<div class="col-span-12 xl:col-start-2">
				<h1
					class="e-h2"
					v-text="`Appointment ${ isConfirmed ? 'confirmed' : 'cancelled' }`"
				/>

				<p
					class="mt-2"
					v-text="'Donec ullamcorper nulla non metus auctor fringilla.'"
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
					<status />
				</div>
			</transition>

			<div
				v-if="isConfirmed"
				:class="[
					'hidden pointer-events-none lg:block',
					'absolute -right-1/24 -bottom-6/24',
					'transform -translate-1/2 w-64',
					'xl:right-2/24 xl:-bottom-4/24',
				]"
			>
				<placeholder ratio="pt-paramedic">
					<img
						src="/static/img/decorations/paramedic.svg"
						alt="See you soon"
					>
				</placeholder>
			</div>
		</div>
	</section>
</template>

<script>
	import { computed } from 'vue';
	import { useStore } from 'vuex';

	import { useMessages } from '@/composables/useMessages';
	import messages from '@/messages';

	import Status from '@/domain/appointments/Status';

	export default {
		components: {
			Status,
		},

		setup() {
			const store = useStore();
			const { message } = useMessages(messages);

			const isConfirmed = computed(() => store.state.appointments.isConfirmed);

			return {
				message,
				isConfirmed,
			};
		},
	};
</script>
