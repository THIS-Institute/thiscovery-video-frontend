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

			<x-button
				title="Delete"
				icon="close"
				:class="[
					'absolute bottom-6 right-6 text-red',
					'hover:text-black focus:text-black',
				]"
				:disabled="!comment"
				flipped
				small
				type="subtle"
				@click="comment = null"
			/>
		</div>
	</div>

	<div class="flex items-center justify-center space-x-2 mt-5">
		<x-button
			title="Cancel"
			class="e-button--red-outline"
			small
			type="pill"
			@click="$emit('close')"
		/>

		<x-button
			title="Save note"
			icon="check"
			class="e-button--red"
			flipped
			small
			type="pill"
			@click="$emit('save', comment)"
		/>
	</div>
</template>

<script>
	import { reactive, toRefs } from 'vue';

	export default {
		props: {
			comments: {
				type: String,
				default: null,
			},
		},

		emits: [
			'save',
			'close',
		],

		setup(props) {
			const state = reactive({
				comment: props.comments,
			});

			return {
				...toRefs(state),
			};
		},
	};
</script>
