<template>
	<div class="flex items-center mt-5">
		<e-button
			v-if="!lowerLimit"
			title="Previous"
			icon="chevron-left"
			class="text-red hover:text-black focus:text-black"
			flipped
			@click="moveTo(index - 1)"
		/>

		<div class="pl-2.5 ml-auto">
			<e-button
				v-if="!upperLimit"
				title="Next"
				icon="chevron-right"
				class="e-button--red-outline"
				pill
				@click="moveTo(index + 1)"
			/>

			<e-button
				v-else
				title="Continue"
				icon="chevron-right"
				class="e-button--red"
				:url="{ name: nextRoute }"
				pill
			/>
		</div>
	</div>

	<ul class="flex items-center space-x-2 mt-7.5">
		<li
			v-for="(tab, i) in total"
			:key="i"
		>
			<button
				:class="[
					'transition-all duration-200',
					'w-3 h-3 rounded-full transform focus:outline-none',
					i === index
						? 'bg-red scale-125'
						: 'bg-grey-200 scale-90 hover:bg-red hover:bg-opacity-50',
				]"
				@click="moveTo(i)"
			/>
		</li>
	</ul>
</template>

<script>
	import { computed } from 'vue';

	export default {
		props: {
			total: {
				type: Number,
				required: true,
			},

			index: {
				type: Number,
				required: true,
			},

			nextRoute: {
				type: String,
				required: true,
			},
		},

		emits: [
			'move',
		],

		setup(props, { emit }) {
			const lowerLimit = computed(() => {
				return props.index === 0;
			});

			const upperLimit = computed(() => {
				return props.index === (props.total - 1);
			});

			const moveTo = (value) => emit('move', value);
		
			return {
				lowerLimit,
				upperLimit,
				moveTo,
			};
		},
	};
</script>
