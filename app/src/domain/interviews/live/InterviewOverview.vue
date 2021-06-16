<template>
	<div class="col-span-12 sm:col-span-8 sm:col-start-3 lg:col-span-4 lg:col-start-5">
		<section class="relative bg-white rounded-lg">
			<div
				class="flex flex-col px-5 md:px-11.25 py-6 md:py-10"
				:class="{
					'min-h-104.5': isLoading,
				}"
			>
				<template v-if="!isLoading && !isError">
					<icon-text
						class="e-h4"
						:icon="{
							name: 'camera',
							size: 'w-6 h-6',
						}"
						:text="message('live.title')"
					/>
					
					<h2
						class="e-h-interview mt-5"
						v-text="appointmentTitle"
					/>

					<aside class="py-7 px-7 5 border border-grey-200 rounded-lg mt-5">
						<h1
							class="text-red text-sm"
							v-text="message('live.landing.due')"
						/>

						<p
							class="text-lg font-bold mt-2.5"
							v-text="appointmentDate"
						/>
					</aside>

					<x-button
						title="Continue"
						class="e-button--red mx-auto mt-6 self-center"
						type="pill"
						:disabled="isLoading"
						@click="onContinue"
					/>
				</template>

				<loading-spinner v-if="isLoading" />

				<div
					v-if="isError"
					class="flex flex-col px-5 md:px-11.25 py-6 md:py-10"
				>
					<h1
						class="text-red text-xl"
					>
						Error
					</h1>

					<p
						class="text-lg font-bold mt-2.5"
					>
						Something has gone wrong
					</p>
				</div>
			</div>
		</section>

		<div
			v-if="!isLoading && !isError && !isInterviewer"
			class="flex flex-col items-center text-center mt-12"
		>
			<h2
				class="e-h4"
				v-text="message('live.landing.cancel')"
			/>

			<x-button
				title="Cancel appointment"
				icon="close"
				class="e-button--red-outline mt-2.5"
				flipped
				url="/"
				small
				type="pill"
			/>
		</div>
	</div>
</template>

<script>
	import { ref, computed } from 'vue';
	import { useStore } from 'vuex';
	import { useRoute, useRouter } from 'vue-router'
	import { ROUTE_LIVE_SETTINGS } from '@/routeConstants';

	import messages from '@/messages';
	import { useMessages } from '@/composables/useMessages';
	import { useDates } from '@/domain/appointments/useDates';
	import LoadingSpinner from '@/components/LoadingSpinner';

	export default {
		components: { LoadingSpinner },

		setup() {
			const isLoading = ref(true);
			const isError = ref(false);
			const store = useStore();
			const route = useRoute();
			const router = useRouter();
			const { message } = useMessages(messages);

			const onContinue = () => {
				router.push({
					name: ROUTE_LIVE_SETTINGS,
					params: { ...route.params },
				});
			};

			const onHasRoomToken = () => {
				isLoading.value = false;
			};

			const onCatch = () => {
				isLoading.value = false;
				isError.value = true;
			};

			const options = {
				identity: store.getters['user/getIdentity'],
				room: route.params.id,
			};

			Promise.all([
					store.dispatch('interviews/getAppointment', options),
					store.dispatch('interviews/getAccessToken', options),
				])
				.then(onHasRoomToken)
				.catch(onCatch);

			const {
				asFormattedDate,
				asFormattedTime,
			} = useDates();

			const appointmentTitle = computed(() => store.state.task.title);

			const isInterviewer = computed(() => store.state.user.isInterviewer);

			const appointmentDate = computed(() => {
				const datetime = store.state.appointments.selection;

				if (!datetime) {
					return null;
				}

				return `${asFormattedDate(datetime)}, ${asFormattedTime(datetime)}`;
			});

			return {
				isLoading,
				isError,
				onContinue,
				message,
				appointmentTitle,
				appointmentDate,
				isInterviewer,
			}
		},
	};
</script>
