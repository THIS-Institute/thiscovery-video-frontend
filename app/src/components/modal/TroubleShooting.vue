<template>
	<icon-text
		class="e-h3"
		:text="copy.title"
		:icon="{
			name: 'info',
		}"
	/>

	<hr class="border-opacity-25 border-grey-400 mt-5">

	<div class="flex flex-col mt-6 space-y-6 max-h-96 overflow-scroll pr-2">
		<div
			v-for="(group, index) in copy.items"
			:key="index"
		>
			<h2
				class="e-h4"
				v-text="group.title"
			/>

			<ul class="list-disc text-base space-y-2 mt-2">
				<li
					v-for="(suggestion, i) in group.suggestions"
					:key="i"
					class="ml-6"
					v-text="suggestion"
				/>
			</ul>
		</div>
	</div>

	<div class="flex items-center justify-center space-x-4 mt-5">
		<x-button
			title="Close"
			class="e-button--red-outline"
			small
			type="pill"
			@click="$emit('close')"
		/>
	</div>
</template>

<script>
	import messages from '@/messages';
	import { useMessages } from '@/composables/useMessages';

	import { computed } from 'vue';

	export default {
		emits: [
			'close',
		],

		setup() {
			const { message } = useMessages(messages);

			const copy = computed(() => ({
				title: message('troubleShoot.title'),
				items: message('troubleShoot.items'),
			}));

			return {
				copy,
			};
		},
	};
</script>
