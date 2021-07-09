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

	export default {
		props: {
			selection: {
				type: String,
				required: true,
			},
		},

		setup(props) {
			const store = useStore();

			const openCalendar = () => {
				store.dispatch('app/openModal', {
					type: 'calendar',
					value: {
						selection: props.selection,
					},
				});
			};

			return {
				openCalendar,
			};
		},
	}
</script>
