<template>
	<section class="e-container my-12 md:my-18 xl:my-24">
		<div class="relative grid grid-cols-12 gap-5">
			<div class="hidden col-span-2 items-end relative transform translate-y-24 xl:flex">
				<placeholder ratio="pt-clipboard">
					<img
						src="/static/img/decorations/clipboard.svg"
						alt="Person holding clipboard and tablet"
					>
				</placeholder>
			</div>

			<div class="col-span-12 lg:col-span-8 lg:col-start-2 xl:col-span-6 xl:col-start-4">
				<div
					:class="[
						'grid grid-cols-6 gap-x-5 items-center',
						'bg-white rounded-lg w-full',
					]"
				>
					<div class="col-span-6 p-4 sm:col-span-4 sm:pl-6 sm:pr-9">
						<icon-text
							tag="h2"
							class="e-h4"
							text="Self record"
							:icon="{
								name: 'video',
								size: 'w-6 h-6',
							}"
						/>

						<h2
							class="e-h3 mt-5"
							v-text="active.title"
						/>

						<p
							class="mt-5"
							v-text="active.content"
						/>

						<instructions-nav
							:total="instructionsLength"
							:index="index"
							@move="setInstruction"
						/>
					</div>

					<div
						:class="[
							'row-end-1 col-span-6 pt-4 px-4',
							'sm:px-0 py-4',
							'sm:col-span-2 sm:col-start-1 sm:row-end-1 sm:-ml-8',
							'md:-ml-14',
						]"
					>
						<placeholder
							ratio="pt-instruction"
							class="rounded-lg overflow-hidden"
						>
							<img v-bind="active.img">
						</placeholder>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import { computed, reactive, toRefs } from 'vue';
	import messages from '@/messages';
	import { useMessages } from '@/composables/useMessages';
	import InstructionsNav from '@/components/methods/InstructionsNav';

	export default {
		components: { InstructionsNav },

		setup() {
			const { message } = useMessages(messages);

			const state = reactive({
				index: 0,
			});

			const instructions = message('selfRecord.methodOverview.instructions');
			const instructionsLength = instructions.length;

			const active = computed(() => instructions[state.index]);

			const setInstruction = (index) => state.index = index;

			return {
				...toRefs(state),
				instructionsLength,
				setInstruction,
				active,
			};
		},
	};
</script>
