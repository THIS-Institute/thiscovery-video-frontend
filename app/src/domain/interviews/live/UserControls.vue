<template>
	<div class="flex items-center space-x-1 px-5 py-4 z-1">
		<tooltip
			:text="hidden ? 'Enable camera' : 'Disable Camera'"
			bottom
		>
			<x-button
				:icons="[
					'camera',
					hidden ? 'camera-strike' : null
				]"
				:class="hidden ? 'e-button--red' : 'e-button--white-outline'"
				type="icon"
				@click="onToggleCamera"
			/>
		</tooltip>

		<tooltip
			:text="muted ? 'Unmute microphone' : 'Mute microphone'"
			bottom
		>
			<x-button
				:icons="[
					'microphone',
					muted ? 'microphone-strike' : null,
				]"
				:class="muted ? 'e-button--red' : 'e-button--white-outline'"
				type="icon"
				@click="onToggleMute"
			/>
		</tooltip>

		<div class="relative">
			<tooltip
				text="Options"
				:hidden="options"
				bottom
			>
				<x-button
					v-click-outside="closeOptions"
					icon="options"
					:class="options ? 'e-button--white' : 'e-button--white-outline'"
					type="icon"
					@keyup.esc="closeOptions"
					@click="onToggleOptions"
				/>
			</tooltip>

			<transition
				enter-active-class="transition-all ease-out duration-300"
				leave-active-class="transition-all ease-in duration-200"
				enter-from-class="opacity-0 translate-y-4 sm:scale-95"
				leave-to-class="opacity-0 translate-y-4 sm:scale-95"
			>
				<div
					v-if="options"
					:class="[
						'absolute bg-white whitespace-nowrap rounded-lg',
						'top-24 left-1/2 transform -translate-x-1/2',
						'shadow-sticky',
					]"
				>
					<icon
						name="triangle"
						class="text-white absolute -top-3 left-1/2 transform -translate-x-1/2"
					/>

					<ul class="flex flex-col px-8 py-7 space-y-4">
						<li>
							<x-button
								title="Join by phone"
								icon="phone"
								class="hover:text-red"
								flipped
								type="subtle"
								@click="phone"
							/>
						</li>
					</ul>

					<hr class="border-opacity-25 border-grey-400">

					<div class="px-8 py-4">
						<x-button
							title="Get help"
							class="e-button--red-outline"
							small
							type="pill"
							@click="openTroubleshoot"
						/>
					</div>
				</div>
			</transition>

			<modal-container wrapper-class="max-w-xl">
				<trouble-shooting
					@close="closeTroubleshoot"
				/>
			</modal-container>
		</div>
	</div>
</template>

<script>
	import { reactive, toRefs } from 'vue';
	import { useStore } from 'vuex';

	import ModalContainer from '@/components/modal/ModalContainer';
	import TroubleShooting from '@/components/modal/TroubleShooting';

	export default {
		components: {
			ModalContainer,
			TroubleShooting,
		},

		emits: [
			'toggleCamera',
			'toggleMute',
		],

		setup(props, { emit }) {
			const state = reactive({
				muted: false,
				hidden: false,
				options: false,
			});

			const store = useStore();
			const phone = () => store.commit('app/toggleModal');

			const onToggleOptions = () => {
				state.options = !state.options;
			};

			const closeOptions = () => state.options = false;
			const openTroubleshoot = () => store.commit('app/toggleModal');
			const closeTroubleshoot = () => store.dispatch('app/closeModal');

			const onToggleCamera = () => {
				state.hidden = !state.hidden;
				emit('toggleCamera', state.hidden);
			};

			const onToggleMute = () => {
				state.muted = !state.muted;
				emit('toggleMute', state.muted);
			};

			const logger = (string) => console.log(string);

			return {
				...toRefs(state),
				phone,
				onToggleMute,
				onToggleCamera,
				onToggleOptions,
				openTroubleshoot,
				closeTroubleshoot,
				closeOptions,
				logger,
			};
		},
	};
</script>
