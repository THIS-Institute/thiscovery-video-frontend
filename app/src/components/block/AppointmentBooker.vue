<template>
	<section
		:class="[
			'grid grid-cols-10 gap-y-7.5 gap-x-5 items-center pb-16',
			'md:pb-0',
			'xl:rounded-lg xl:bg-white',
			'xl:px-18 xl:py-8',
		]"
	>
		<div class="col-span-10 md:col-span-4">
			<div class="flex items-center space-x-4">
				<div class="flex items-center justify-center rounded-full p-3 bg-pink">
					<icon
						name="camera"
						class="e-h3"
					/>
				</div>

				<h1 class="e-h3">Live interview</h1>
			</div>

			<h1 class="e-h2 mt-6">Suggest recommendations for good practice</h1>

			<selected-slot :date="date" />

			<e-button
				title="Book appointment"
				icon="chevron-right"
				class="e-button--red mt-5 hidden md:inline-block"
				:disabled="!date"
				pill
			/>
		</div>

		<div class="col-span-10 md:col-span-6 md:col-start-5">
			<date-picker />
		</div>
	</section>

	<div class="sticky bottom-0 bg-white p-5 -mx-5 sm:-mx-10 shadow-sticky md:hidden">
		<e-button
			title="Book appointment"
			icon="chevron-right"
			class="e-button--red"
			:disabled="!date"
			pill
		/>
	</div>
</template>

<script>
	import { store } from '@/store/index';
	import { computed } from 'vue';

	import DatePicker from '@/components/block/DatePicker';
	import SelectedSlot from '@/components/block/SelectedSlot';

	export default {
		components: {
			DatePicker,
			SelectedSlot,
		},

		setup() {
			const date = computed(() => {
				if (!store.state.task.timeslot) return;

				return store.state.task.timeslot;
			});

			return {
				date,
			};
		},
	};
</script>
