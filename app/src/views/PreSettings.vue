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
									'pb-16': !msgs.infoBar || !isLive(),
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
										v-text="msgs.title"
									/>

									<p
										v-if="msgs.content"
										class="text-sm text-center mt-1.5"
										v-text="msgs.content"
									/>

									<e-button
										v-if="hasMicrophone"
										:title="message(`${domain}.preSettings.continueButtonText`)"
										icon="chevron-right"
										class="e-button--red mt-5"
										:url="{ name: nextRoute }"
										pill
									/>

									<e-button
										v-else
										title="How to fix this"
										icon="chevron-right"
										class="e-button--red mt-5"
										pill
										@click="troubleShoot"
									/>

									<modal-container wrapper-class="max-w-xl">
										<trouble-shooting />
									</modal-container>
								</div>

								<devices class="mt-5" />
							</div>

							<info-bar
								v-if="isLive() && msgs.infoBar"
								class="mt-12"
								v-bind="msgs.infoBar"
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

	import VideoPreview from '@/domain/interviews/settings/VideoPreview';
	import InfoBar from '@/components/InfoBar';
	import Devices from '@/components/Devices';
	import ModalContainer from '@/components/modal/ModalContainer';
	import TroubleShooting from '@/components/modal/TroubleShooting';

	export default {
		components: {
			VideoPreview,
			InfoBar,
			Devices,
			ModalContainer,
			TroubleShooting,
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
			
			const msgs = message(`preSettings`);

			store.dispatch('interviews/updateMediaDevices');
			
			const troubleShoot = () => store.commit('app/toggleModal');

			const { hasMicrophone, hasCamera } = useDevices();

			const isLive = () => {
				return props.domain === 'live';
			}

			return {
				message,
				hasCamera,
				hasMicrophone,
				userGivenName,
				msgs,
				troubleShoot,
				isLive,
			};
		},
	};
</script>
