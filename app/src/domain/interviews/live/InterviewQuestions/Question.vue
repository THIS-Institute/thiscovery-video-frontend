<template>
	<div class="flex items-center justify-between space-x-6 sm:space-x-12">
		<div class="inline-flex items-center space-x-1/2em">
			<div class="flex items-center justify-center rounded-full p-1/2em bg-pink">
				<icon
					size="w-6 h-6"
					name="question"
				/>
			</div>

			<transition
				enter-active-class="transform transition-all ease-out duration-300"
				leave-active-class="transform transition-opacity ease-in duration-200"
				:enter-from-class="`opacity-0 ${ right ? 'translate-x-2' : '-translate-x-2' }`"
				leave-to-class="opacity-0"
				mode="out-in"
			>
				<p
					:key="question.name"
					:class="{ 'hidden sm:block': hidden }"
					v-text="(isInterviewer) ? question.name : `Current Question`"
				/>
			</transition>
		</div>

		<button
			class="flex items-center focus:outline-none"
			@click="$emit('toggle-hidden')"
		>
			<icon
				name="chevron-right"
				class="transform text-red"
				size="w-4 h-4"
				:class="hidden ? '-rotate-90' : 'rotate-90'"
			/>
		</button>
	</div>

	<transition
		enter-active-class="transform transition-all ease-out duration-300"
		leave-active-class="transform transition-opacity ease-in duration-200"
		:enter-from-class="`opacity-0 ${ right ? 'translate-x-2' : '-translate-x-2' }`"
		leave-to-class="opacity-0"
		mode="out-in"
	>
		<p
			:key="question.title"
			class="mt-7 text-black"
			:class="{
				'hidden': hidden,
			}"
			v-text="question.title"
		/>
	</transition>
</template>

<script>
	export default {
		props: {
			question: {
				type: Object,
				required: true,
			},

			isInterviewer: {
				type: Boolean,
				default: false,
			},

			right: Boolean,
			hidden: Boolean,
		},

		emits: [
			'toggle-hidden',
		],
	};
</script>
