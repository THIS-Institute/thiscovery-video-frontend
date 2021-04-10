<template>
	<div class="flex flex-wrap items-center justify-between gap-y-5 px-5 my-5">
		<e-button
			title="Add more"
			icon="record"
			class="e-button--white-outline"
			flipped
			small
			pill
			@click="$emit('addMore')"
		/>

		<e-button
			title="Next question"
			icon="check"
			class="e-button--green"
			flipped
			small
			pill
			@click="$emit('nextQuestion')"
		/>
	</div>
</template>

<script>
	export default {
		emits: [
			'addMore',
			'nextQuestion',
		]
	};
</script>
