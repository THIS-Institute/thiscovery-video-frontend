<template>
	<section class="e-container my-12 md:my-18 xl:my-24">
		<div class="relative md:w-18/24 md:left-3/24 lg:w-16/24 lg:left-4/24 xl:w-12/24 xl:left-6/24">
			<div
				:class="[
					'grid grid-cols-6 gap-x-5 items-center',
					'bg-white rounded-lg w-full',
				]"
			>
				<div class="col-span-6 p-4 sm:col-span-4 sm:pl-6 sm:pr-9">
					<icon-text
						icon="video"
						text="Self record"
						class="font-bold"
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
						:total="instructions.length"
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
	</section>
</template>

<script>
	import InstructionsNav from '@/components/methods/InstructionsNav';

	import { computed, reactive, toRefs } from 'vue';

	export default {
		components: {
			InstructionsNav,
		},

		setup() {
			const instructions = [
				{
					title: "You'll be asked a series of questions",
					content: "Nullam quis risus eget urna mollis ornare vel eu leo. Macenas faucibus mollis interdum",
					img: {
						src: "//placehold.it/275x428?text=1",
						alt: "Placeholder image",
					},
				},
				{
					title: "Title 2",
					content: "Nullam quis risus eget urna mollis ornare vel eu leo. Macenas faucibus mollis interdum",
					img: {
						src: "//placehold.it/275x428?text=2",
						alt: "Placeholder image",
					},
				},
				{
					title: "Title 3",
					content: "Nullam quis risus eget urna mollis ornare vel eu leo. Macenas faucibus mollis interdum",
					img: {
						src: "//placehold.it/275x428?text=3",
						alt: "Placeholder image",
					},
				},
			];

			const state = reactive({
				index: 0,
			});

			const active = computed(() => instructions[state.index]);

			const setInstruction = (index) => state.index = index;

			return {
				...toRefs(state),
				setInstruction,
				active,
				instructions,
			};
		},
	};
</script>
