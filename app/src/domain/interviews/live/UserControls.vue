<template>
	<div class="flex items-center space-x-1 px-5 py-4 z-1">
		<tooltip
			:text="hidden ? 'Enable camera' : 'Disable Camera'"
			bottom
		>
			<e-button
				:icons="[
					'camera',
					hidden ? 'camera-strike' : null
				]"
				:class="hidden ? 'e-button--red' : 'e-button--white-outline'"
				@click="onToggleCamera"
			/>
		</tooltip>

		<tooltip
			:text="muted ? 'Unmute microphone' : 'Mute microphone'"
			bottom
		>
			<e-button
				:icons="[
					'audio-base',
					muted ? 'audio-off' : 'audio-sound'
				]"
				:class="muted ? 'e-button--red' : 'e-button--white-outline'"
				@click="onToggleMute"
			/>
		</tooltip>

		<div class="relative">
			<tooltip
				text="Options"
				:hidden="options"
				bottom
			>
				<e-button
					icon="options"
					:class="options ? 'e-button--white' : 'e-button--white-outline'"
					@click="toggle('options')"
				/>
			</tooltip>

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
						<e-button
							title="Settings"
							icon="settings"
							flipped
							url="/"
						/>
					</li>

					<li>
						<e-button
							title="Join by phone"
							icon="phone"
							flipped
							@click="phone"
						/>
					</li>
				</ul>

				<hr class="border-opacity-25 border-grey-400">

				<div class="px-8 py-4">
					<e-button
						title="Get help"
						class="e-button--red-outline"
						small
						pill
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { reactive, toRefs } from 'vue';
	import { useStore } from 'vuex';

	export default {
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

			const toggle = (option) => state[option] = !state[option];

			const store = useStore();
			const phone = () => store.commit('app/toggleModal');

			const onToggleCamera = () => {
				state.hidden = !state.hidden;
				emit('toggleCamera', state.hidden);
			};

			const onToggleMute = () => {
				state.muted = !state.muted;
				emit('toggleMute', state.muted);
			};

			return {
				...toRefs(state),
				toggle,
				phone,
				onToggleMute,
				onToggleCamera,
			};
		},
	};
</script>