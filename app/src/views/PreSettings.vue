<template>
	<section class="e-container my-12 md:my-18 xl:my-24">
		<div class="grid grid-cols-12 gap-5 w-full">
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
									v-if="msgs.cta"
									:title="msgs.cta.title"
									icon="chevron-right"
									class="e-button--red mt-5"
									:url="{ name: nextRoute }"
									pill
								/>
							</div>

							<devices
								v-if="msgs.devices"
								class="mt-5"
								v-bind="msgs.devices"
							/>
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

	import VideoWrapper from '@/components/interviews/settings/VideoWrapper';
	import InfoBar from '@/components/ui/InfoBar';
	import Devices from '@/components/ui/Devices';

	export default {
		components: {
			VideoWrapper,
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
			const { message } = useMessages(messages);

			const msgs = message(`${props.domain}.preSettings`);

			return { msgs }
		},
	};
</script>
