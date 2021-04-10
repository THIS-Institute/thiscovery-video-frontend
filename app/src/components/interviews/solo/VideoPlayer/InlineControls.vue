<template>
	<div class="flex items-end justify-center p-4 space-x-2">
		<tooltip text="Watch answer">
			<e-button
				icon="play"
				class="e-button--white"
				@click="$emit('watchAnswer')"
			/>
		</tooltip>

		<tooltip text="Add comments">
			<e-button
				icon="scribe"
				class="e-button--white"
				@click="$emit('addComments')"
			/>
		</tooltip>
	</div>
</template>

<script>
	export default {
		emits: [
			'watchAnswer',
			'addComments',
		],

		setup() {
		},
	}
</script>
