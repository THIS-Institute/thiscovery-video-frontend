<template>
	<aside>
		<div class="bg-grey-100 rounded-md">
			<p class="flex flex-wrap justify-center gap-x-2 p-4 text-sm">
				<span v-text="title" />

				<button
					v-if="modal"
					class="transition-colors duration-200 text-red hover:text-black focus:outline-none"
					@click="$emit('open-modal')"
					v-text="cta.title"
				/>

				<router-link
					v-else
					class="transition-colors duration-200 text-red hover:text-black"
					:to="cta.url"
					v-text="cta.title"
				/>
			</p>
		</div>
	</aside>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				required: true,
			},

			cta: {
				type: Object,
				required: true,
			},

		
			modal: Boolean
		},

		emits: [
			'open-modal',
		],
	};
</script>
