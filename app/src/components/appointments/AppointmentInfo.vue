<template>
	<div class="bg-grey-100 rounded-lg px-12 py-14">
		<h3
			class="e-h3"
			v-text="title"
		/>

		<p
			class="mt-5"
			v-text="content"
		/>

		<div class="flex flex-col items-start space-y-5 mt-10">
			<e-button
				title="Reschedule appointment"
				icon="edit"
				class="text-red hover:text-black focus:text-black"
				flipped
				@click="$emit('reschedule')"
			/>

			<e-button
				title="Cancel appointment"
				icon="close"
				class="text-red hover:text-black focus:text-black"
				flipped
				@click="$emit('cancel')"
			/>
		</div>

		<e-button
			title="Back to project page"
			class="e-button--red mt-10"
			url="/"
			pill
		/>
	</div>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				required: true,
			},

			content: {
				type: String,
				required: true,
			},
		},

		emits: [
			'reschedule',
			'cancel',
		],
	};
</script>
