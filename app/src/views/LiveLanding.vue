<template>
	<section class="e-container my-12 md:my-18 xl:my-24">
		<div class="grid grid-cols-12 gap-5 w-full">
			<div class="hidden col-span-3 col-start-2 items-end transform translate-y-24 xl:flex">
				<placeholder ratio="pt-nurse">
					<img
						src="/static/img/decorations/nurse.svg"
						alt="Nurse holding a clipboard"
					>
				</placeholder>
			</div>

			<transition
				enter-active-class="transform transition-all ease-out delay-200 duration-300"
				leave-active-class="transform transition-all ease-in duration-200"
				enter-from-class="opacity-0 translate-y-4 sm:scale-95"
				leave-to-class="opacity-0 translate-y-4 sm:scale-95"
				appear
			>
				<interview-overview />
			</transition>
		</div>
	</section>
</template>

<script>
	import InterviewOverview from '@/domain/interviews/live/InterviewOverview.vue';

	export default {
		components: { InterviewOverview },
	};
</script>
