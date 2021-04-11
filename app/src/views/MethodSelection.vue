<template>
	<section class="e-container my-12 md:my-18 xl:my-24">
		<div class="relative grid grid-cols-12 gap-5">
			<div class="col-span-12 xl:col-span-10 xl:col-start-2">
				<h1
					class="e-h2"
					v-text="message('landing.title')"
				/>

				<p
					class="mt-2"
					v-text="message('landing.content')"
				/>
			</div>

			<div class="relative grid grid-cols-8 gap-5 mt-7 col-span-12 xl:col-start-2 xl:col-span-8">
				<method-card
					v-for="(path, index) in paths"
					:key="index"
					class="col-span-8 sm:col-span-8 md:col-span-5 xl:col-span-4"
					v-bind="path"
				/>
			</div>

			<div class="hidden col-start-11 col-span-2 items-end relative transform translate-y-24 xl:flex">
				<placeholder ratio="pt-doctor">
					<img
						src="/static/img/decorations/doctor.svg"
						alt="Doctor holding a clipboard"
					>
				</placeholder>
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

			const types = [
				"video/webm",
				"audio/webm",
				"video/webm;codecs=vp8",
				"video/webm;codecs=vp9",
				"video/webm;codecs=daala",
				"video/webm;codecs=h264",
				"audio/webm;codecs=opus",
				"video/mpeg"
			];

			for (var i in types) {
				console.log(`${types[i]}:${MediaRecorder.isTypeSupported(types[i])}`);
			}

			let paths = message('landing.paths');
			if (!paths || !Array.isArray(paths)) {
				paths = [];
			}

			return { message, paths }
		},
	};
</script>
