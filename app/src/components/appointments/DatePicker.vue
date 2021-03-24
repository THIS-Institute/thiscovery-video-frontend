<template>
	<div class="relative">
		<div
			class="grid grid-cols-3 px-5 relative xl:grid-cols-4"
			:class="{ 'opacity-25': submitting }"
		>
			<div
				v-for="(date, index) in dates"
				:key="index"
				class="px-2"
			>
				<p
					class="text-center"
					v-text="date.title"
				/>
			</div>

			<div
				:class="[
					'absolute inset-0 w-full h-full',
					'flex items-center justify-between',
					'pointer-events-none',
				]"
			>
				<button
					v-for="next in [false, true]"
					:key="next"
					:class="[
						'inline-flex items-center pointer-events-auto',
						'text-red disabled:opacity-25',
					]"
					:disabled="next ? upperLimit : lowerLimit"
					@click="cycleDates(next)"
				>
					<icon :name="next ? 'chevron-right' : 'chevron-left'" />
				</button>
			</div>
		</div>

		<div
			:class="[
				'grid grid-cols-3 mt-4 px-5',
				'max-h-date-picker overflow-y-scroll',
				'border border-grey-100 rounded-lg',
				'xl:grid-cols-4',
				{
					'opacity-25': submitting,
				},
			]"
		>
			<div
				v-for="(date, index) in dates"
				:key="index"
				:class="{
					'bg-grey-200 bg-opacity-10': index % 2 === 1,
				}"
			>
				<ol class="flex flex-col space-y-4 py-2.5 px-2">
					<li
						v-for="slot in date.timeslots"
						:key="slot.time"
						class="flex justify-center"
					>
						<e-button
							:title="`${slot.time}${slot.meridiem}`"
							:class="[
								'e-button--time justify-center',
								{
									'hover:bg-transparent': !slot.available,
								},
							]"
							time
							:small="total <= 3"
							:disabled="!slot.available"
							@click="select(date, slot)"
						/>
					</li>
				</ol>
			</div>
		</div>

		<loading-spinner v-if="submitting" />
	</div>
</template>

<script>
	import { store } from '@/store/index';

	import { reactive, toRefs, computed } from 'vue';
	import { useViewport } from '@/composables/useViewport';
	import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';

	export default {
		components: { LoadingSpinner },

		props: {
			calendar: {
				type: Array,
				default: null,
			},

			submitting: Boolean,
		},
		
		setup(props) {
			const state = reactive({
				start: 0,
				total: 4,
				selected: null,
			});

			const selected = computed(() => {
				const active = state.selected;

				return `${active.date} ${active.slot}${active.meridiem}`;
			});

			const dates = computed(() => {
				return props.calendar.slice(state.start, (state.start + state.total));
			});

			const lowerLimit = computed(() => props.calendar[state.start].limit);

			const upperLimit = computed(() => props.calendar[(state.start + state.total) - 1].limit);

			const select = (date, slot) => {
				store.commit('task/select', { date, slot });
			};

			const cycleDates = (forward) => {
				state.start += forward ? 1 : -1;
			};

			const onViewportResized = () => {
				state.total = getMediaQuery('xl') ? 4 : 3;
			};

			const { getMediaQuery } = useViewport(onViewportResized);

			return {
				lowerLimit,
				upperLimit,
				cycleDates,
				select,
				selected,
				dates,
				...toRefs(state),
			};
		},
	};
</script>
