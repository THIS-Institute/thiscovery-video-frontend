<template>
	<section class="e-container my-12 md:my-18 xl:my-24">
		<div class="grid grid-cols-12 gap-5 w-full">
			<div class="col-start-2 col-span-3 max-w-64 hidden items-end relative transform translate-y-24 xl:flex">
				<placeholder ratio="pt-doctor-wave">
					<img
						src="/static/img/decorations/doctor--wave.svg"
						alt="Medical professional at work"
					>
				</placeholder>
			</div>

			<div class="col-span-12 sm:col-span-8 sm:col-start-3 lg:col-span-6 lg:col-start-4 xl:col-span-4 xl:col-start-5">
				<transition
					enter-active-class="transform transition-all ease-out delay-150 duration-300"
					enter-from-class="opacity-0 translate-y-4 sm:scale-95"
					appear
				>
					<div class="bg-white rounded-lg w-full">
						<div
							:class="[
								'flex flex-col p-2.5 w-full',
								{
									'pb-16': !isLive(),
								},
							]"
						>
							<div class="rounded-lg overflow-hidden">
								<video-preview :forced-microphone="!isLive()" />
							</div>

							<div class="max-w-86 mx-auto">
								<div class="flex flex-col items-center mt-12">
									<h2
										class="e-h3 text-center"
										v-text="copy.title"
									/>

									<p
										v-if="copy.content"
										class="text-sm text-center mt-1.5"
										v-text="copy.content"
									/>

									<x-button
										v-if="!hasError"
										:title="message(`${domain}.preSettings.continueButtonText`)"
										icon="chevron-right"
										class="e-button--red mt-5"
										:url="{ name: nextRoute }"
										type="pill"
									/>

									<x-button
										v-else
										title="How to fix this"
										icon="chevron-right"
										class="e-button--red mt-5"
										type="pill"
										@click="openModal(modals.troubleshoot)"
									/>
								</div>

								<devices
									v-if="hasError"
									class="mt-5"
								/>
							</div>

							<info-bar
								v-if="isLive()"
								class="mt-12"
								title="Having trouble?"
								:cta="{
									title: 'Join by phone',
								}"
								modal
								@open-modal="openModal(modals.phone)"
							/>
						</div>
					</div>
				</transition>
			</div>
		</div>
	</section>
</template>

<script>
	import { useStore } from 'vuex';
	import { reactive, computed } from 'vue';

	import messages from '@/messages';
	import { useMessages } from '@/composables/useMessages';
	import { useUser } from '@/auth/useUser';
	import { useDevices } from '@/domain/interviews/settings/useDevices';

	import modals from '@/modals';

	import VideoPreview from '@/domain/interviews/settings/VideoPreview';
	import InfoBar from '@/components/InfoBar';
	import Devices from '@/components/Devices';

	export default {
		components: {
			VideoPreview,
			InfoBar,
			Devices,
		},

		props: {
			domain: {
				type: String,
				required: true,
			},

			nextRoute: {
				type: String,
				required: true,
			},
		},

		setup(props) {
			const store = useStore();
			const { message } = useMessages(messages);
			const { userGivenName } = useUser();
			const { hasMicrophone, hasCamera } = useDevices();

			store.dispatch('interviews/updateMediaDevices');

			const state = reactive({
				hasMicrophone,
				hasCamera,
			});

			const hasError = computed(() => !(state.hasMicrophone && state.hasCamera));

			const copy = computed(() => ({
				title: message(`preSettings.${hasError.value ? 'error.title' : 'title'}`),
				content: message(`preSettings.${hasError.value ? 'error.content' : 'content'}`),
				infoBar: message('preSettings.infoBar'),
			}));

			const isLive = () => props.domain === 'live';

			const openModal = (options) => store.dispatch('app/openModal', options);

			return {
				copy,
				message,
				hasCamera,
				hasMicrophone,
				userGivenName,
				hasError,
				modals,
				openModal,
				isLive,
			};
		},
	};
</script>
