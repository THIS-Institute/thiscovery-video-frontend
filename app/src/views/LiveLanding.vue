<template>
	<section class="e-container my-12 md:my-18 xl:my-24">
		<div class="grid grid-cols-12 gap-5 w-full">
			<div class="col-span-12 sm:col-span-8 sm:col-start-3 lg:col-span-4 lg:col-start-5">
				<div class="bg-white rounded-lg w-full">
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
							:url="{ name: 'live_settings' }"
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

	export default {
		setup() {
			// All the below will be moved or superseded at a later time
			const identity = ref(null);
			const store = useStore();
			const route = useRoute();
			const router = useRouter();

			const initLive = () => {
				console.info(`Loading with indentity: ${identity.value}`);
				store.dispatch('interviews/getAccessToken', {
					identity: identity.value,
					room: route.params.id,
				}).then(() => {
					router.push({
						name: 'live_room',
						params: { ...route.params },
					});
				});
			};

			return { identity, initLive }
		},
	};
</script>
