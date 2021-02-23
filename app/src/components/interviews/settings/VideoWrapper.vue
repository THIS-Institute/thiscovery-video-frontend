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
					<icon
						name="record"
					/>

					<span>Rec</span>
				</div>
			</div>
		</template>

		<template v-if="!hideControls">
			<div class="flex items-end justify-center p-4 space-x-2">
				<!-- <e-button
					:icons="[
						'camera',
						hidden ? 'camera-strike' : null
					]"
					:class="hidden ? 'e-button--red' : 'e-button--white'"
					@click="toggle('hidden')"
				/>

				<e-button
					:icons="[
						'audio-base',
						muted ? 'audio-off' : 'audio-sound'
					]"
					:class="muted ? 'e-button--red' : 'e-button--white'"
					@click="toggle('muted')"
				/> -->

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
			</div>
		</template>
	</placeholder>
</template>

<script>
	import { reactive, toRefs, computed } from 'vue';
	import { useStore } from 'vuex';

	import VideoPreview from '@/components/interviews/settings/VideoPreview';

	export default {
		components: {
			VideoPreview,
		},

		props: {
			hideControls: Boolean,
		},

		setup() {
			const state = reactive({
				muted: true,
				hidden: false,
				recording: true,
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
