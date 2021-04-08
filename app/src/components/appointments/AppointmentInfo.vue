<template>
	<div class="relative">
		<div
			class="relative bg-grey-100 rounded-lg px-12 py-14"
			:class="{ 'opacity-75': isWaiting }"
		>
			<h3
				class="e-h3"
				v-text="message('live.appointments.info.title')"
			/>

			<p
				class="mt-5"
				v-text="message('live.appointments.info.content')"
			/>

			<div class="flex flex-col items-start space-y-5 mt-10">
				<e-button
					title="Reschedule appointment"
					icon="edit"
					class="text-red hover:text-black focus:text-black"
					flipped
					:disabled="isWaiting"
					@click="$emit('reschedule')"
				/>

				<e-button
					title="Cancel appointment"
					icon="close"
					class="text-red hover:text-black focus:text-black"
					flipped
					:disabled="isWaiting"
					@click="$emit('cancel')"
				/>
			</div>

			<e-button
				title="Back to project page"
				class="e-button--red mt-10"
				url="/"
				:disabled="isWaiting"
				pill
			/>
		</div>

		<loading-spinner v-if="isWaiting" />
	</div>
</template>

<script>
	import { computed } from 'vue';
	import { useStore } from 'vuex';
	import messages from '@/messages';
	import { useMessages } from '@/composables/useMessages';

	import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';

	export default {
		components: { LoadingSpinner },

		emits: [
			'reschedule',
			'cancel',
		],

		setup() {
			const store = useStore();
			const { message } = useMessages(messages);
			const isWaiting = computed(() => store.state.appointments.isWaiting);

			return {
				message,
				isWaiting,
			}
		},
	};
</script>
