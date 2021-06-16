<template>
	<icon-text
		class="e-h3"
		:text="message('preSettings.fix')"
		:icon="{
			name: 'info',
		}"
	/>

	<hr class="border-opacity-25 border-grey-400 mt-5">

	<div class="flex flex-col space-y-2 mt-6 max-h-96 overflow-scroll pr-2">
		<p v-text="message('preSettings.lorem')" />

		<p v-text="message('preSettings.lorem')" />

		<p v-text="message('preSettings.lorem')" />

		<p v-text="message('preSettings.lorem')" />
	</div>

	<div class="flex items-center justify-center space-x-4 mt-5">
		<x-button
			title="Close"
			class="e-button--red-outline"
			small
			type="pill"
			@click="toggle"
		/>
	</div>
</template>

<script>
	import { useStore } from 'vuex';

	import messages from '@/messages';
	import { useMessages } from '@/composables/useMessages';

	export default {
		setup() {
			const { message } = useMessages(messages);
			const store = useStore();

			const active = store.state.app.modalActive;

			const toggle = () => {
				if (active) store.commit('app/toggleModal');
			};

			return {
				toggle,
				message,
			};
		},
	};
</script>
