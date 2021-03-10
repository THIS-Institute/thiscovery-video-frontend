<template>
	<section class="e-container my-12 md:my-18 xl:my-24">
		<div class="grid grid-cols-12 gap-5 w-full">
			<div class="col-span-12 sm:col-span-8 sm:col-start-3 lg:col-span-4 lg:col-start-5">
				<template v-if="earlyReturn">
					<section class="bg-white rounded-lg">
						<div class="flex flex-col px-5 md:px-11.25 py-6 md:py-10">
							<icon-text
								class="e-h4"
								:icon="{
									name: 'camera',
									size: 'w-6 h-6',
								}"
								:text="message('live.landing.title')"
							/>

							<h2
								class="e-h-interview mt-5"
								v-text="message('live.landing.content')"
							/>

							<!-- TODO: Set additional state -->
							<selected-slot
								class="mt-7.5"
								:date="{
									date: '18th March',
									slot: '09:30',
									meridiem: 'am',
								}"
								:confirmed="true"
							/>

							<e-button
								title="Continue"
								class="e-button--red mx-auto mt-6 self-center"
								pill
							/>
						</div>
					</section>

					<div class="flex flex-col items-center text-center mt-12">
						<h2
							class="e-h4"
							v-text="message('live.landing.cancel')"
						/>

						<e-button
							title="Cancel appointment"
							icon="close"
							class="e-button--red-outline mt-2.5"
							flipped
							small
							pill
						/>
					</div>
				</template>

				<div
					v-else
					class="bg-white rounded-lg w-full"
				>
					<div class="p-2.5 pb-16 w-full">
						Some interview at some time on some date
						
						<div>
							<input
								v-model="identity"
								class="w-full my-2"
								type="text"
								placeholder="[debug] Enter your interview name"
							>
						</div>

						<e-button
							title="Continue"
							icon="chevron-right"
							class="e-button--red mt-5"
							:url="{ name: ROUTE_LIVE_SETTINGS }"
							pill
							@click.prevent="initLive"
						/>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import { ref } from 'vue';
	import { useStore } from 'vuex';
	import { useRouter, useRoute } from 'vue-router'
	import { ROUTE_LIVE_ROOM, ROUTE_LIVE_SETTINGS } from '@/routeConstants';

	import messages from '@/messages';
	import { useMessages } from '@/composables/useMessages';

	import SelectedSlot from '@/components/appointments/SelectedSlot';

	export default {
		components: {
			SelectedSlot,
		},

		props: {
			earlyReturn: Boolean,
		},

		setup() {
			// All the below will be moved or superseded at a later time
			const identity = ref(null);
			const store = useStore();
			const route = useRoute();
			const router = useRouter();
			const { message } = useMessages(messages);

			const initLive = () => {
				console.info(`Loading with indentity: ${identity.value}`);
				store.dispatch('interviews/getAccessToken', {
					identity: identity.value,
					room: route.params.id,
				}).then(() => {
					router.push({
						name: ROUTE_LIVE_ROOM,
						params: { ...route.params },
					});
				});
			};

			return {
				ROUTE_LIVE_SETTINGS,
				identity,
				initLive,
				message,
			}
		},
	};
</script>
