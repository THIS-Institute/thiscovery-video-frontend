<template>
	<icon-text
		tag="h2"
		text="Add comments"
		:icon="{
			name: 'scribe',
		}"
		class="e-h3"
	/>

	<div class="mt-5">
		<div class="relative">
			<textarea
				v-model="comment"
				rows="4"
				cols="40"
				:class="[
					'rounded-md p-7',
					'border border-black border-opacity-20',
					'focus:outline-none focus:border-grey-400',
				]"
			/>

			<e-button
				title="Delete"
				icon="close"
				:class="[
					'absolute bottom-6 right-6 text-red',
					'hover:text-black focus:text-black',
				]"
				:disabled="!comment"
				flipped
				small
				@click="comment = null"
			/>
		</div>
	</div>

	<div class="flex items-center justify-center space-x-2 mt-5">
		<e-button
			title="cancel"
			class="e-button--red-outline"
			small
			pill
			@click="toggle"
		/>

		<e-button
			title="Save note"
			icon="check"
			class="e-button--red"
			:disabled="!comment"
			flipped
			small
			pill
		/>
	</div>
</template>

<script>
	import { reactive, toRefs } from 'vue';
	import { useStore } from 'vuex';

	export default {
		setup() {
			const state = reactive({
				comment: null,
			});

			const store = useStore();
			const active = store.state.app.modalActive;

			const toggle = () => {
				if (active) store.commit('app/toggleModal');
			};

			return {
				...toRefs(state),
				toggle,
			};
		},
	};
</script>
