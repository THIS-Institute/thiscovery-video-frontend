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

			<div class="col-span-12 sm:col-span-8 sm:col-start-3 lg:col-span-4 lg:col-start-5">
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
									'pb-16': !isLive,
								},
							]"
						>
							<div class="rounded-lg overflow-hidden">
								<video-preview />
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
										@click="showTroubleshoot = true"
									/>

									<modal-container
										wrapper-class="max-w-xl"
										@close="onForceClose"
									>
										<trouble-shooting
											v-if="showTroubleshoot"
											@close="onForceClose"
										/>

										<join-by-phone
											v-if="showPhone"
											@close="onForceClose"
										/>
									</modal-container>
								</div>

								<devices
									v-if="hasError"
									class="mt-5"
								/>
							</div>

							<info-bar
								v-if="isLive"
								class="mt-12"
								title="Having trouble?"
								:cta="{
									title: 'Join by phone',
								}"
								modal
								@open-modal="showPhone = true"
							/>
						</div>
					</div>
				</transition>
			</div>
		</div>
	</section>
</template>

<script>
	import messages from '@/messages';
	import { useMessages } from '@/composables/useMessages';
	import { useStore } from 'vuex';
	import { useUser } from '@/auth/useUser';
	import { useDevices } from '@/domain/interviews/settings/useDevices';
	import { reactive, toRefs, watch, computed } from 'vue';

	import VideoPreview from '@/domain/interviews/settings/VideoPreview';
	import InfoBar from '@/components/InfoBar';
	import Devices from '@/components/Devices';
	import ModalContainer from '@/components/modal/ModalContainer';
	import TroubleShooting from '@/components/modal/TroubleShooting';
	import JoinByPhone from '@/components/modal/JoinByPhone';

	export default {
		components: {
			VideoPreview,
			InfoBar,
			Devices,
			ModalContainer,
			TroubleShooting,
			JoinByPhone,
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

			store.dispatch('interviews/updateMediaDevices');
			const { hasMicrophone, hasCamera } = useDevices();

			const isLive = () => props.domain === 'live';

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

			const modals = reactive({
				showTroubleshoot: false,
				showPhone: false,
			});

			watch(modals, () => {
				const isset = Object.keys(modals).every((k) => !modals[k]);

				if (!isset) store.dispatch('app/openModal');
			});

			const onForceClose = () => {
				store.dispatch('app/closeModal');
				Object.keys(modals).forEach(v => modals[v] = false);
			};

			return {
				...toRefs(modals),
				copy,
				message,
				hasCamera,
				hasMicrophone,
				userGivenName,
				hasError,
				onForceClose,
				isLive,
			};
		},
	};
</script>
