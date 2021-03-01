<template>
	<div class="flex items-center justify-between space-x-5">
		<icon-text
			:text="title"
			:icon="{
				name: 'question',
				size: 'w-6 h-6',
			}"
		/>

		<button
			class="flex items-center focus:outline-none"
			@click="$emit('toggle-hidden')"
		>
			<icon
				name="chevron-right"
				class="transform text-red"
				:class="hidden ? '-rotate-90' : 'rotate-90'"
			/>
		</button>
	</div>

	<p
		v-if="!hidden"
		class="mt-7"
		v-text="question"
	/>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				required: true,
			},

			question: {
				type: String,
				required: true,
			},

			hidden: Boolean,
		},

		emits: [
			'toggle-hidden',
		],
	};
</script>
