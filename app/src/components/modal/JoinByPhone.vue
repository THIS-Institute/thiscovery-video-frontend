<template>
	<div class="flex flex-col items-center text-center">
		<icon-text
			class="e-h3 md:-ml-12"
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
				title="Cancel"
				class="e-button--red-outline"
				small
				type="pill"
				@click="$emit('close')"
			/>
		</div>
	</div>
</template>

<script>
	import messages from '@/messages';
	import { useMessages } from '@/composables/useMessages';

	export default {
		emits: [
			'close',
		],

		setup() {
			const { message } = useMessages(messages);

			return {
				message,
			};
		},
	};
</script>
