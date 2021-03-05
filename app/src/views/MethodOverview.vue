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

		props: {
			instructions: {
				type: Array,
				required: true,
			},
		},

		setup(props) {
			const state = reactive({
				index: 0,
			});

			const active = computed(() => props.instructions[state.index]);

			const setInstruction = (index) => state.index = index;

			return {
				...toRefs(state),
				setInstruction,
				active,
			};
		},
	};
</script>
