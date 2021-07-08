<template>
	<div class="flex items-center space-x-1 px-5 py-4 z-1">
		<tooltip
			:text="userSettings.video ? 'Disable camera' : 'Enable Camera'"
			bottom
		>
			<x-button
				:icons="[
					'camera',
					userSettings.video ? null : 'camera-strike',
				]"
				:class="userSettings.video ? 'e-button--white-outline' : 'e-button--red'"
				type="icon"
				@click="onToggleCamera"
			/>
		</tooltip>

		<tooltip
			:text="userSettings.audio ? 'Mute microphone' : 'Unmute microphone'"
			bottom
		>
			<x-button
				:icons="[
					'microphone',
					userSettings.audio ? null : 'microphone-strike',
				]"
				:class="userSettings.audio ? 'e-button--white-outline' : 'e-button--red'"
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
					icon="options"
					:class="options ? 'e-button--white' : 'e-button--white-outline'"
					type="icon"
					@keyup.esc="onToggleOptions"
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
								@click="$emit('openJoinByPhone')"
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
							@click="$emit('openTroubleshoot')"
						/>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
	import { ref, computed } from 'vue';
	import { useStore } from 'vuex';

	export default {
		emits: [
			'toggleCamera',
			'toggleMute',
			'openTroubleshoot',
			'openJoinByPhone',
		],

		setup(props, { emit }) {
			const store = useStore();

			const options = ref(false);
			const userSettings = computed(() => store.getters['app/getSettings']);

			const onToggleMute = () => {
				store.commit('app/toggleMicrophone');
				emit('toggleMute', userSettings.value.audio);
			};

			const onToggleCamera = () => {
				store.commit('app/toggleCamera');
				emit('toggleCamera', userSettings.value.video);
			};

			const onToggleOptions = () => options.value = !options.value;

			return {
				options,
				userSettings,
				onToggleMute,
				onToggleCamera,
				onToggleOptions,
			};
		},
	};
</script>
