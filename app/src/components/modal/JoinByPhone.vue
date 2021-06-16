<template>
	<icon-text
		class="e-h3"
		:text="message('live.joinByPhone.title')"
		:icon="{
			name: 'phone',
		}"
	/>

	<div class="flex flex-col space-y-1 mt-4">
		<h2
			class="e-h4"
			v-text="message('live.joinByPhone.number.title')"
		/>

		<pre v-text="message('live.joinByPhone.number.value')" />
	</div>

	<div class="flex flex-col space-y-1 mt-4">
		<h2
			class="e-h4"
			v-text="message('live.joinByPhone.pin.title')"
		/>

		<pre v-text="message('live.joinByPhone.pin.value')" />
	</div>

	<div class="flex items-center justify-center space-x-4 mt-5">
		<x-button
			title="cancel"
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
