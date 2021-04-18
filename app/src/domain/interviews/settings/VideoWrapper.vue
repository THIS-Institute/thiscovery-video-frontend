<template>
	<placeholder
		ratio="pt-3/4"
		class="bg-grey-400"
	>
		<template v-if="hidden">
			<div class="flex items-center justify-center">
				<div
					:class="[
						'flex items-center justify-center',
						'bg-grey-300 text-white rounded-full',
						'w-32 h-32',
					]"
				>
					<h1
						class="e-h4"
						v-text="profile.name"
					/>
				</div>
			</div>
		</template>

		<template v-else-if="reviewing">
			<slot />
		</template>

		<video-preview v-else />

		<template v-if="recording">
			<div class="flex items-start justify-end p-4">
				<div
					:class="[
						'flex items-center space-x-1',
						'px-1.5 py-1 rounded-full',
						'bg-red text-white text-sm',
					]"
				>
					<icon name="record" />

					<span>Rec</span>
				</div>
			</div>
		</template>

		<template v-if="loading">
			<div class="flex flex-col items-center justify-center text-white p-4 bg-black bg-opacity-50">
				<h1 class="e-h2">
					3
				</h1>

				<h2 class="e-h3 mt-4">
					Get ready to answer
				</h2>
			</div>
		</template>

		<template v-if="!hideControls">
			<div class="flex items-end justify-center p-4 space-x-2">
				<template v-if="preRecord || recording">
					<tooltip :text="hidden ? 'Enable camera' : 'Disable Camera'">
						<e-button
							:icons="[
								'camera',
								hidden ? 'camera-strike' : null
							]"
							:class="hidden ? 'e-button--red' : 'e-button--white'"
							@click="toggle('hidden')"
						/>
					</tooltip>

					<tooltip :text="muted ? 'Unmute microphone' : 'Mute microphone'">
						<e-button
							:icons="[
								'audio-base',
								muted ? 'audio-off' : 'audio-sound'
							]"
							:class="muted ? 'e-button--red' : 'e-button--white'"
							@click="toggle('muted')"
						/>
					</tooltip>
				</template>

				<template v-else-if="stopped">
					<tooltip text="Watch answer">
						<e-button
							icon="play"
							class="e-button--white"
						/>
					</tooltip>

					<tooltip text="Add comments">
						<e-button
							icon="scribe"
							class="e-button--white"
						/>
					</tooltip>
				</template>

				<template v-else-if="reviewing">
					<e-button
						:icon="isPlaying ? 'pause' : 'play'"
						class="e-button--white"
						@click="$emit('toggle-playback')"
					/>
				</template>
			</div>
		</template>
	</placeholder>
</template>

<script>
	import { reactive, toRefs, computed } from 'vue';
	import { useStore } from 'vuex';

	import VideoPreview from '@/domain/interviews/settings/VideoPreview';

	export default {
		components: {
			VideoPreview,
		},

		props: {
			// User has not yet started recording
			preRecord: Boolean,

			// User has clicked record and is loading
			loading: Boolean,

			// User is now recording their answer
			recording: Boolean,

			// User has stopped the recording
			stopped: Boolean,

			// User is rewatching their answer
			reviewing: Boolean,

			// Hides controls altogether
			hideControls: Boolean,

			isPlaying: Boolean,
		},

		emits: [
			'toggle-playback',
		],

		setup() {
			const state = reactive({
				muted: false,
				hidden: false,
			});

			const store = useStore();
			const profile = computed(() => store.state.user.profile);

			const toggle = (option) => state[option] = !state[option];

			return {
				...toRefs(state),
				profile,
				toggle,
			};
		},
	};
</script>
