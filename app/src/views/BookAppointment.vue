<template>
	<section class="e-container my-12 md:my-18 xl:my-24">
		<div class="relative xl:w-20/24 xl:left-2/24">
			<h1
				class="e-h2"
				v-text="title"
			/>

			<p
				class="mt-2"
				v-text="content"
			/>

			<hr class="e-divider mt-5 border-0 xl:hidden">

			<div class="e-content relative mt-12 xl:mt-7">
				<appointment-slots v-bind="slots" />
			</div>
		</div>
	</section>
</template>

<script>
	import AppointmentSlots from '@/components/appointments/AppointmentSlots';

	export default {
		components: {
			AppointmentSlots,
		},

		props: {
			title: {
				type: String,
				required: true,
			},

			content: {
				type: String,
				required: true,
			},

			slots: {
				type: Object,
				default: null,
			},
		},
	};
</script>
