<template>
	<div class="col-span-12 sm:col-span-8 sm:col-start-3 lg:col-span-4 lg:col-start-5">
		<section class="relative bg-white rounded-lg">
			<div
				v-if="!isLoading"
				class="flex flex-col px-5 md:px-11.25 py-6 md:py-10"
			>
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

				<aside class="py-7 px-7 5 border border-grey-200 rounded-lg mt-5">
					<h1
						class="text-red text-sm"
						v-text="message('live.landing.due')"
					/>

					<p
						class="text-lg font-bold mt-2.5"
						v-text="message('live.landing.date')"
					/>
				</aside>

				<e-button
					title="Continue"
					class="e-button--red mx-auto mt-6 self-center"
					pill
					:disabled="isLoading"
					@click="onContinue"
				/>
			</div>
			<loading-spinner
				v-if="isLoading"
			/>
		</section>

		<div
			v-if="!isLoading"
			class="flex flex-col items-center text-center mt-12"
		>
			<h2
				class="e-h4"
				v-text="message('live.landing.cancel')"
			/>

			<e-button
				title="Cancel appointment"
				icon="close"
				class="e-button--red-outline mt-2.5"
				flipped
				url="/"
				small
				pill
			/>
		</div>
	</div>
</template>

<script>
	import { ref } from 'vue';
	import { useStore } from 'vuex';
	import { useRoute, useRouter } from 'vue-router'
	import { ROUTE_LIVE_SETTINGS } from '@/routeConstants';

	import messages from '@/messages';
	import { useMessages } from '@/composables/useMessages';
	import LoadingSpinner from '@/components/LoadingSpinner';

	export default {
		components: { LoadingSpinner },

		setup() {
			const isLoading = ref(true);
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

			const options = {
				identity: store.getters['user/getIdentity'],
				room: route.params.id,
			};

			store.dispatch('interviews/getAccessToken', options)
				.then(onHasRoomToken);

			return {
				isLoading,
				onContinue,
				message,
			}
		},
	};
</script>
