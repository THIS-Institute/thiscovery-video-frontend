import { readonly, computed, ref } from 'vue';

export function useQuestions(items, initialSection, initialQuestion) {
	// Reactive & readonly instances of Section index
	let section = ref(initialSection);
	const readSection = readonly(section);
	const isComplete = ref(false);

	// Reactive & readonly instances of Question index
	let question = ref(initialQuestion);
	const readQuestion = readonly(question);

	// Returns the current section object
	const activeSection = computed(() => items[section.value]);

	// Flattend sections
	const flatSections = items.reduce((a, v) => a.concat(v.questions), []);

	// Total number of questions overall
	const totalQuestions = computed(() => flatSections.length);

	// Returns the current questions overall index
	const activeQuestion = computed(() => {
		return flatSections.findIndex(q => q === activeSection.value.questions[question.value]);
	});

	// Adds 1 to any Number, makes indexes more readable
	const toReadableValue = val => val + 1;

	// Cycles sections & questions one at a time
	const nextQuestion = () => {
		const totalSections  = items.length;
		const totalActiveQuestions  = activeSection.value.questions.length;

		if (totalActiveQuestions > toReadableValue(question.value)) {
			question.value++;
		} else {
			if (toReadableValue(section.value) !== totalSections) {
				section.value++;
				question.value = 0;
			} else {
				isComplete.value = true;
			}
		}
	};

	return {
		toReadableValue,
		activeQuestion,
		totalQuestions,
		activeSection,
		nextQuestion,
		readQuestion,
		readSection,
		isComplete,
	};
}
