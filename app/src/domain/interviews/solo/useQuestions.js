import { computed, ref } from 'vue';

export function useQuestions(items, initialSection = 0, initialQuestion = 0) {
	const isComplete = ref(false);
	const sectionIndex = ref(initialSection);
	const questionIndex = ref(initialQuestion);

	// Returns the current section object
	const section = computed(() => items[sectionIndex.value]);

	// Flattend sections
	const flatSections = items.reduce((a, v) => a.concat(v.questions), []);

	// Total number of questions overall
	const totalQuestions = computed(() => flatSections.length);

	// Returns the current questions overall index
	const questionSequenceIndex = computed(() => {
		return flatSections.findIndex(q => q === section.value.questions[questionIndex.value]);
	});

	// Adds 1 to any Number, makes indexes more readable
	const toReadableValue = val => val + 1;

	/**
	 * Returns boolean if there are questions
	 * remaining in the section.
	 */
	const hasQuestionsRemainingInSection = () => {
		const remainingQuestions = section.value.questions.length;

		return remainingQuestions > (questionIndex.value + 1);
	};

	/**
	 * Returns boolean if section is the last
	 * section in the set.
	 */
	const isLastSection = computed(() => {
		return (sectionIndex.value + 1) === items.length;
	});

	/**
	 * Returns the next section index in the set.
	 * Returns null if the section is the last.
	 */
	const getNextSectionIndex = () => {
		if (isLastSection.value) {
			return null;
		}

		if (hasQuestionsRemainingInSection()) {
			return sectionIndex.value;
		}

		return sectionIndex.value + 1;
	};

	/**
	 * Returns the next question index, the question
	 * index is based on the section.
	 */
	const getNextQuestionIndex = () => {
		if (hasQuestionsRemainingInSection()) {
			return questionIndex.value + 1;
		}

		return 0;
	};

	/**
	 * Progresses questions and sections.
	 * Returns void.
	 */
	const nextQuestion = () => {
		if (hasQuestionsRemainingInSection()) {
			questionIndex.value++;
			return;
		}

		if (isLastSection.value) {
			isComplete.value = true;
			return;
		}
		
		sectionIndex.value++;
		questionIndex.value = 0;
	};

	return {
		toReadableValue,
		totalQuestions,
		sectionIndex,
		questionIndex,
		questionSequenceIndex,
		section,
		nextQuestion,
		isComplete,
		isLastSection,
		getNextSectionIndex,
		getNextQuestionIndex,
	};
}
