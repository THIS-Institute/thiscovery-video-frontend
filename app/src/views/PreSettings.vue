<template>
	<section class="e-container my-12 md:my-18 xl:my-24">
		<div class="grid grid-cols-12 gap-5 w-full">
			<div class="col-span-3 hidden items-end relative transform translate-y-24 xl:flex">
				<placeholder ratio="pt-surgeon">
					<img
						src="/static/img/decorations/surgeon.svg"
						alt="Medical professional at work"
					>
				</placeholder>
			</div>

			<div class="col-span-12 sm:col-span-8 sm:col-start-3 lg:col-span-4 lg:col-start-5">
				<div class="bg-white rounded-lg w-full">
					<div
						:class="[
							'flex flex-col p-2.5 w-full',
							{
								'pb-16': !msgs.infoBar,
							},
						]"
					>
						<video-wrapper
							v-if="hasCamera"
							class="rounded-lg overflow-hidden"
							pre-record
						/>

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
									:title="msgs.cta.title"
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
							v-if="msgs.infoBar"
							class="mt-12"
							v-bind="msgs.infoBar"
						/>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import messages from '@/messages';
	import { useMessages } from '@/composables/useMessages';
	import { useStore } from 'vuex';
	import { useDevices } from '@/components/interviews/settings/useDevices';

	import VideoWrapper from '@/components/interviews/settings/VideoWrapper';
	import InfoBar from '@/components/ui/InfoBar';
	import Devices from '@/components/ui/Devices';
	import ModalContainer from '@/components/ui/modal/ModalContainer';
	import TroubleShooting from '@/components/ui/modal/TroubleShooting';

	export default {
		components: {
			VideoWrapper,
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

		setup() {
			const store = useStore();
			const { message } = useMessages(messages);
			const msgs = message(`preSettings`);

			store.dispatch('interviews/updateMediaDevices');
			
			const troubleShoot = () => store.commit('app/toggleModal');

			const { hasMicrophone, hasCamera } = useDevices();

			return {
				hasCamera,
				hasMicrophone,
				msgs,
				troubleShoot,
			};
		},
	};
</script>
