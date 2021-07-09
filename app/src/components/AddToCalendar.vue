<template>
	<x-button
		title="Add to calendar"
		icon="calendar"
		class="e-button--red-outline"
		flipped
		type="pill"
		v-bind="$attrs"
		@click="openCalendar"
	/>
</template>

<script>
	import { useStore } from 'vuex';
	import modals from '@/modals';

	export default {
		props: {
			selection: {
				type: String,
				required: true,
			},
		},

		setup() {
			const store = useStore();

			const openCalendar = () => store.dispatch('app/openModal', modals.calendar);

			return {
				openCalendar,
			};
		},
	}
</script>
