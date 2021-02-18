<template>
	<section class="e-container flex min-h-screen h-full md:items-center">
		<div class="grid grid-cols-12 w-full gap-5 mt-12 md:my-18 xl:my-24">
			<div
				:class="[
					'col-span-12',
					'md:col-span-10 md:col-start-2',
					'xl:col-span-8 xl:col-start-3',
				]"
			>
				<div class="flex flex-wrap-reverse items-center gap-y-5">
					<div class="flex items-center space-x-4 mr-5">
						<span
							:class="[
								'flex items-center justify-center',
								'rounded-full p-2 w-8 h-8',
								'bg-aubergine text-white text-sm',
							]"
							v-text="toReadableValue(section)"
						/>

						<h2
							class="e-h3"
							v-text="activeSection.title"
						/>
					</div>

					<e-button
						title="Save and exit"
						icon="save"
						class="e-button--red-outline ml-auto"
						flipped
						pill
					/>
				</div>

				<div class="relative w-full h-1 overflow-hidden rounded-full bg-white mt-3">
					<span
						:class="[
							'absolute inset-0 w-full',
							'transition-transform origin-left duration-200',
							'rounded-full bg-aubergine',
						]"
						:style="progress"
					/>

					<p class="sr-only">
						Question {{ toReadableValue(currentQuestion) }} of {{ totalQuestions }}
					</p>
				</div>

				<div
					:class="[
						'grid grid-cols-12 gap-5',
						'bg-white mt-10',
						'-mx-gutter p-5 sm:p-7.5 sm:mx-0 sm:rounded-lg',
					]"
				>
					<div
						:class="[
							'col-span-12',
							'sm:col-span-10 sm:col-start-2',
							'lg:col-span-6 lg:col-start-1 lg:mx-3.5',
						]"
					>
						<question
							:number="toReadableValue(question)"
							v-bind="activeSection.questions[question]"
						/>
					</div>

					<div
						:class="[
							'col-span-12 row-start-1',
							'sm:col-span-10 sm:col-start-2',
							'lg:col-span-6 lg:col-start-7',
						]"
					>
						<div class="rounded-lg bg-black h-64" />

						<button
							class="my-10"
							@click="nextQuestion()"
						>
							Next Q
						</button>

						<helper
							class="mt-2.5"
							title="Having trouble recording?"
							:cta="{
								title: 'See how to fix this',
								url: '#',
							}"
						/>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import { computed, reactive, toRefs } from 'vue';

	// import { useQuestions } from '@/composables/useQuestions';

	import Question from '@/components/interviews/solo/Question';
	import Helper from '@/components/ui/Helper';

	export default {
		components: {
			Question,
			Helper,
		},

		props: {
			sections: {
				type: Array,
				default: () => [
					{
						title: "Introductory questions",
						questions: [
							{
								title: "Please spend a couple of minutes describing your professional experience in the field of obstetrics.",
								description: "Think about your past experiences in relevant roles you duis mollis, est non commando luctus, nisi erat prttitor ligula, egat lacinia odio sem nec elit. Nulla vitae elit livero, a pharetra augue.",
							},
							{
								title: "Please spend a couple of minutes describing your professional experience in the field of question 2.",
								description: "Think about your past experiences in relevant roles you duis mollis, est non commando luctus, nisi erat prttitor ligula, egat lacinia odio sem nec elit. Nulla vitae elit livero, a pharetra augue.",
							},
							{
								title: "Please spend a couple of minutes describing your professional experience in the field of question 3.",
								description: "Think about your past experiences in relevant roles you duis mollis, est non commando luctus, nisi erat prttitor ligula, egat lacinia odio sem nec elit. Nulla vitae elit livero, a pharetra augue.",
							},
						],
					},
					{
						title: "Secondary questions",
						questions: [
							{
								title: "Please spend a couple of minutes describing your professional experience in the field of obstetrics.",
								description: "Think about your past experiences in relevant roles you duis mollis, est non commando luctus, nisi erat prttitor ligula, egat lacinia odio sem nec elit. Nulla vitae elit livero, a pharetra augue.",
							},
							{
								title: "Please spend a couple of minutes describing your professional experience in the field of question 2.",
								description: "Think about your past experiences in relevant roles you duis mollis, est non commando luctus, nisi erat prttitor ligula, egat lacinia odio sem nec elit. Nulla vitae elit livero, a pharetra augue.",
							},
							{
								title: "Please spend a couple of minutes describing your professional experience in the field of question 3.",
								description: "Think about your past experiences in relevant roles you duis mollis, est non commando luctus, nisi erat prttitor ligula, egat lacinia odio sem nec elit. Nulla vitae elit livero, a pharetra augue.",
							},
						],
					},
				],
			},
		},

		setup(props) {
			const state = reactive({
				section: 0,
				question: 0,
			});

			// Returns the active section
			const activeSection = computed(() => props.sections[state.section]);

			// Flattend sections
			const flatSections = props.sections.reduce((acc, val) => { return acc.concat(val.questions) }, []);

			// Total number of questions overall
			const totalQuestions = computed(() => flatSections.length);

			// Active question index
			const currentQuestion = computed(() => {
				return flatSections.findIndex(ques => ques === activeSection.value.questions[state.question]);
			});

			// Percentage progress through all questions
			const progress = computed(() => {
				const value = toReadableValue(currentQuestion.value) / totalQuestions.value;

				return {
					transform: `scaleX(${value.toFixed(2)})`,
				};
			});

			// Adds 1 to any Number, makes indexes more readable
			const toReadableValue = (val) => val + 1;

			// Cycles sections & questions one at a time
			const nextQuestion = () => {
				const totalSections  = props.sections.length;
				const totalActiveQuestions  = activeSection.value.questions.length;

				if (totalActiveQuestions > toReadableValue(state.question)) {
					state.question++;
				} else {
					if (toReadableValue(state.section) !== totalSections) {
						state.section++;
						state.question = 0;
					} else {
						console.log('finished');
					}
				}
			};

			return {
				...toRefs(state),
				toReadableValue,
				currentQuestion,
				totalQuestions,
				activeSection,
				nextQuestion,
				progress,
			};
		},
	};
</script>
