<template>
	<div class="relative">
		<div
			class="grid grid-cols-3 px-5 relative xl:grid-cols-4"
			:class="{ 'opacity-25': isWaiting }"
		>
			<div
				v-for="(date, index) in calendarSnapshot"
				:key="index"
				class="px-2"
			>
				<p
					class="text-center text-sm xl:text-base"
					v-text="asFormattedDate(date.date)"
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
					v-for="forward in [false, true]"
					:key="forward"
					:class="[
						'inline-flex items-center pointer-events-auto',
						'text-red disabled:opacity-25',
					]"
					:disabled="(forward ? upperLimit : lowerLimit) || isWaiting"
					@click="moveSnapshot(forward)"
				>
					<icon :name="forward ? 'chevron-right' : 'chevron-left'" />
				</button>
			</div>
		</div>

		<div
			:class="[
				'grid grid-cols-3 relative mt-4 px-5',
				'max-h-date-picker overflow-y-scroll',
				'border border-grey-400 border-opacity-25 rounded-lg',
				'xl:grid-cols-4',
				{
					'opacity-25': submitting,
				},
			]"
		>
			<div
				v-for="(date, index) in calendarSnapshot"
				:key="index"
				:class="{
					'bg-grey-200 bg-opacity-10': index % 2 === 1,
				}"
			>
				<ol class="flex flex-col space-y-4 py-2.5 px-2">
					<li
						v-for="timeslot in date.timeslots"
						:key="timeslot.time"
						class="flex justify-center"
					>
						<e-button
							:sr-only="asFormattedDate(date.date)"
							:title="asFormattedTime(timeslot.time)"
							:class="[
								'e-button--time justify-center',
								{
									'hover:bg-transparent': !timeslot.available,
								},
							]"
							time
							:small="total <= 3"
							:disabled="!timeslot.available"
							@click="selectTimeslot(timeslot.time)"
						/>
					</li>
				</ol>
			</div>

			<div
				:class="[
					'sticky bottom-0',
					'col-span-3 -mx-5 h-10',
					'bg-gradient-to-t from-white',
					'pointer-events-none',
					'xl:col-span-4',
				]"
			/>
		</div>

		<loading-spinner v-if="isWaiting" />
	</div>
</template>

<script>
	import { reactive, toRefs, computed } from 'vue';
	import { useStore } from 'vuex';
	import { useViewport } from '@/composables/useViewport';
	import { useDates } from './useDates';

	import LoadingSpinner from '@/components/LoadingSpinner';

	export default {
		components: { LoadingSpinner },

		props: {
			calendar: {
				type: Array,
				default: () => {
					return [];
				},
			},

			submitting: Boolean,
		},
		
		setup(props) {
			const store = useStore();
			const snapshot = reactive({
				offset: 0,
				total: 4,
			});

			const calendarSnapshot = computed(() => {
				return props.calendar.slice(snapshot.offset, (snapshot.offset + snapshot.total));
			});

			const isWaiting = computed(() => store.state.appointments.isWaiting);
			const lowerLimit = computed(() => props.calendar[snapshot.offset].limit);
			const upperLimit = computed(() => props.calendar[(snapshot.offset + snapshot.total) - 1].limit);
			const snapshotLast = computed(() => snapshot.offset + snapshot.total);
			const calendarLast = computed(() => props.calendar.length);

			const selectTimeslot = (timeslot) => {
				store.dispatch('appointments/selectTimeslot', timeslot);
			};

			const moveSnapshot = (forward) => {
				const requiresDataFetch = (snapshotLast.value == calendarLast.value);

				if (forward && requiresDataFetch) {
					store
						.dispatch('appointments/pushNextAppointmentDate')
						.then(onNextDateReady);
				} else {
					snapshot.offset += forward ? 1 : -1;
				}
			};

			const onNextDateReady = () => {
				snapshot.offset += 1;
			};

			const onViewportResized = () => {
				snapshot.total = getMediaQuery('xl') ? 4 : 3;
			};

			const { getMediaQuery } = useViewport(onViewportResized);
			const { asFormattedDate, asFormattedTime } = useDates();

			return {
				isWaiting,
				lowerLimit,
				upperLimit,
				moveSnapshot,
				selectTimeslot,
				calendarSnapshot,
				asFormattedDate,
				asFormattedTime,
				...toRefs(snapshot),
			};
		},
	};
</script>
