<template>
	<div
		:class="[
			'flex items-center bg-grey-400',
			'rounded-lg shadow-sticky',
		]"
	>
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
					@click="toggle('hidden')"
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
					@click="toggle('muted')"
				/>
			</tooltip>

			<tooltip
				text="Options"
				bottom
			>
				<e-button
					icon="options"
					class="e-button--white-outline"
				/>
			</tooltip>
		</div>

		<div class="rounded-r-lg overflow-hidden w-36">
			<video-wrapper hide-controls />
		</div>
	</div>
</template>

<script>
	import { reactive, toRefs } from 'vue';

	import VideoWrapper from '@/components/interviews/settings/VideoWrapper';

	export default {
		components: {
			VideoWrapper,
		},

		setup() {
			const state = reactive({
				muted: false,
				hidden: true,
			});

			const toggle = (option) => state[option] = !state[option];

			return {
				...toRefs(state),
				toggle,
			};
		},
	};
</script>
