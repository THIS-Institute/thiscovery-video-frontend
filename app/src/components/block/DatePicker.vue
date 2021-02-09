<template>
	<div class="grid grid-cols-4 px-5">
		<div
			v-for="(date, index) in dates"
			:key="index"
		>
			<p
				class="text-center"
				v-text="date.title"
			/>
		</div>
	</div>

	<div
		:class="[
			'grid grid-cols-4 mt-4',
			'max-h-date-picker overflow-y-scroll',
			'border border-grey-100 rounded-lg px-5',
		]"
	>
		<div
			v-for="(date, index) in dates"
			:key="index"
			:class="{
				'bg-grey-200 bg-opacity-20': index % 2 === 1,
			}"
		>
			<ol class="flex flex-col space-y-4 py-2.5">
				<li
					v-for="slot in date.timeslots"
					:key="slot.time"
					class="flex justify-center"
				>
					<e-button
						:title="`${slot.time}${slot.meridiem}`"
						:class="[
							'e-button--time',
							{
								'hover:bg-transparent': !slot.available,
							},
						]"
						time
						:disabled="!slot.available"
						@click.native="select(date, slot)"
					/>
				</li>
			</ol>
		</div>
	</div>
</template>

<script>
	import { reactive, toRefs, computed } from 'vue';

	export default {
		setup () {
			const data = [
				{
					title: 'Tue 30 Nov',
					timeslots: [
						{
							time: '07:30',
							meridiem: 'am',
							available: false,
						},
						{
							time: '07:45',
							meridiem: 'am',
							available: true,
						},
						{
							time: '08:00',
							meridiem: 'am',
							available: true,
						},
						{
							time: '08:15',
							meridiem: 'am',
							available: true,
						},
						{
							time: '08:30',
							meridiem: 'am',
							available: true,
						},
						{
							time: '08:45',
							meridiem: 'am',
							available: true,
						},
						{
							time: '09:00',
							meridiem: 'am',
							available: false,
						},
						{
							time: '09:15',
							meridiem: 'am',
							available: true,
						},
					],
				},
				{
					title: 'Wed 1 Dec',
					timeslots: [
						{
							time: '07:30',
							meridiem: 'am',
							available: true,
						},
						{
							time: '07:45',
							meridiem: 'am',
							available: true,
						},
						{
							time: '08:00',
							meridiem: 'am',
							available: false,
						},
						{
							time: '08:15',
							meridiem: 'am',
							available: true,
						},
						{
							time: '08:30',
							meridiem: 'am',
							available: true,
						},
						{
							time: '08:45',
							meridiem: 'am',
							available: false,
						},
						{
							time: '09:00',
							meridiem: 'am',
							available: false,
						},
						{
							time: '09:15',
							meridiem: 'am',
							available: true,
						},
					],
				},
				{
					title: 'Thu 2 Dec',
					timeslots: [
						{
							time: '07:30',
							meridiem: 'am',
							available: false,
						},
						{
							time: '07:45',
							meridiem: 'am',
							available: true,
						},
						{
							time: '08:00',
							meridiem: 'am',
							available: true,
						},
						{
							time: '08:15',
							meridiem: 'am',
							available: true,
						},
						{
							time: '08:30',
							meridiem: 'am',
							available: true,
						},
						{
							time: '08:45',
							meridiem: 'am',
							available: false,
						},
						{
							time: '09:00',
							meridiem: 'am',
							available: true,
						},
						{
							time: '09:15',
							meridiem: 'am',
							available: false,
						},
					],
				},
				{
					title: 'Fri 3 Dec',
					timeslots: [
						{
							time: '07:30',
							meridiem: 'am',
							available: true,
						},
						{
							time: '07:45',
							meridiem: 'am',
							available: false,
						},
						{
							time: '08:00',
							meridiem: 'am',
							available: true,
						},
						{
							time: '08:15',
							meridiem: 'am',
							available: true,
						},
						{
							time: '08:30',
							meridiem: 'am',
							available: true,
						},
						{
							time: '08:45',
							meridiem: 'am',
							available: true,
						},
						{
							time: '09:00',
							meridiem: 'am',
							available: false,
						},
						{
							time: '09:15',
							meridiem: 'am',
							available: false,
						},
					],
				},
				{
					title: 'Mon 5 Dec',
					timeslots: [
						{
							time: '07:30',
							meridiem: 'am',
							available: false,
						},
						{
							time: '07:45',
							meridiem: 'am',
							available: true,
						},
						{
							time: '08:00',
							meridiem: 'am',
							available: true,
						},
						{
							time: '08:15',
							meridiem: 'am',
							available: false,
						},
						{
							time: '08:30',
							meridiem: 'am',
							available: false,
						},
						{
							time: '08:45',
							meridiem: 'am',
							available: true,
						},
						{
							time: '09:00',
							meridiem: 'am',
							available: true,
						},
						{
							time: '09:15',
							meridiem: 'am',
							available: true,
						},
					],
					last: true,
				},
			];

			const state = reactive({
				start: 0,
				length: 4,
				selected: null,
			});

			const selected = computed(() => {
				const active = state.selected;

				return `${active.date} ${active.slot}${active.meridiem}`;
			});

			const dates = computed(() => {
				return data.slice(state.start, (state.start + state.length));
			});

			const select = (date, slot) => {
				state.selected = {
					date: date.title,
					slot: slot.time,
					meridiem: slot.meridiem,
				};
			};

			return {
				select,
				selected,
				dates,
				...toRefs(state),
			};
		},
	};
</script>

