<template>
	<section class="e-container my-12 md:my-18 xl:my-24">
		<div class="relative xl:w-20/24 xl:left-2/24">
			<h1
				class="e-h2"
				v-text="message('landing.title')"
			/>

			<p
				class="mt-2"
				v-text="message('landing.content')"
			/>

			<div class="relative grid grid-cols-10 gap-4 mt-7">
				<method-card
					v-for="(path, index) in paths"
					:key="index"
					class="col-span-10 sm:col-span-8 md:col-span-5 xl:col-span-4"
					v-bind="path"
				/>
			</div>
		</div>
	</section>
</template>

<script>
	import messages from '@/messages';
	import { useMessages } from '@/composables/useMessages';
	import MethodCard from '@/components/methods/MethodCard';

	export default {
		components: { MethodCard },

		setup() {
			const { message } = useMessages(messages);

			let paths = message('landing.paths');
			if (!paths || !Array.isArray(paths)) {
				paths = [];
			}

			return { message, paths }
		},
	};
</script>
