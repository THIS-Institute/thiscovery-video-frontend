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
				<transition
					enter-active-class="transform transition-all ease-out duration-300"
					enter-from-class="opacity-0 translate-y-4 sm:scale-95"
					appear
				>
					<div
						:class="[
							'grid grid-cols-6 gap-x-5 items-center',
							'bg-white rounded-lg w-full',
						]"
					>
						<div class="col-span-6 p-4 sm:col-span-4 sm:pl-6 sm:pr-9">
							<transition
								enter-active-class="transform transition-all ease-out duration-300"
								leave-active-class="transform transition-opacity ease-in duration-200"
								:enter-from-class="`opacity-0 ${ right ? 'translate-x-4' : '-translate-x-4' }`"
								leave-to-class="opacity-0"
								mode="out-in"
							>
								<div
									:key="index"
									class="flex flex-col space-y-5"
								>
									<icon-text
										tag="h2"
										class="e-h4"
										:text="title"
										:icon="{
											name: icon,
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
								</div>
							</transition>

							<instructions-nav
								:total="instructionsLength"
								:index="index"
								:next-route="nextRoute"
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
							<transition
								enter-active-class="transform transition-all ease-out duration-300"
								leave-active-class="transform transition-opacity ease-in duration-200"
								:enter-from-class="`opacity-0 ${ right ? 'translate-x-4' : '-translate-x-4' }`"
								leave-to-class="opacity-0"
								mode="out-in"
							>
								<placeholder
									:key="index"
									ratio="pt-instruction"
									class="rounded-lg overflow-hidden"
								>
									<img v-bind="active.img">
								</placeholder>
							</transition>
						</div>
					</div>
				</transition>
			</div>
		</div>
	</section>
</template>

<script>
	import { computed, reactive, toRefs } from 'vue';
	import { ROUTE_HOME, ROUTE_SELF_SETTINGS } from '@/routeConstants';
	import messages from '@/messages';
	import { useMessages } from '@/composables/useMessages';
	import InstructionsNav from '@/domain/methods/InstructionsNav';

	export default {
		components: { InstructionsNav },

		props: {
			domain: {
				type: String,
				required: true,
			},
		},

		setup(props) {
			const { message } = useMessages(messages);

			const state = reactive({
				index: 0,
				right: true,
			});

			let title;
			let icon;
			let instructions;
			let nextRoute;

			if (props.domain === 'live') {
				title = message('live.title');
				icon = message('live.icon');
				instructions = message('live.methodOverview.instructions');
				nextRoute = ROUTE_HOME;
			} else {
				title = message('selfRecord.title');
				icon = message('selfRecord.icon');
				instructions = message('selfRecord.methodOverview.instructions');
				nextRoute = ROUTE_HOME;
			}
			
			const instructionsLength = instructions.length;

			const active = computed(() => instructions[state.index]);

			const setInstruction = (index) => {
				state.right = index > state.index;
				state.index = index;
			};

			return {
				...toRefs(state),
				title,
				icon,
				nextRoute,
				instructionsLength,
				setInstruction,
				active,
			};
		},
	};
</script>
