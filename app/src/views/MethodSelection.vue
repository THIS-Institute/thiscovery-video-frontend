<template>
	<section class="e-container my-12 md:my-18 xl:my-24">
		<div class="relative grid grid-cols-12 gap-5">
			<div class="col-span-12 xl:col-span-10 xl:col-start-2">
				<h1
					class="e-h2"
					v-text="message('landing.title')"
				/>

				<p
					class="mt-2"
					v-text="message('landing.content')"
				/>
			</div>

			<div class="relative grid grid-cols-8 gap-5 mt-7 col-span-12 xl:col-start-2 xl:col-span-8">
				<transition
					enter-active-class="transform transition-all ease-out duration-300"
					enter-from-class="opacity-0 translate-y-4 sm:scale-95"
					appear
				>
					<method-card
						class="col-span-8 sm:col-span-8 md:col-span-5 xl:col-span-4"
						v-bind="message('landing.paths.live')"
						:available="isLiveAvailable"
					/>
				</transition>

				<transition
					enter-active-class="transform transition-all delay-150 ease-out duration-300"
					enter-from-class="opacity-0 translate-y-4 sm:scale-95"
					appear
				>
					<method-card
						class="col-span-8 sm:col-span-8 md:col-span-5 xl:col-span-4"
						v-bind="message('landing.paths.selfRecord')"
						:available="isOnDemandAvailable"
					/>
				</transition>
			</div>

			<div class="hidden col-start-11 col-span-2 items-end relative transform translate-y-24 xl:flex">
				<placeholder ratio="pt-doctor">
					<img
						src="/static/img/decorations/doctor.svg"
						alt="Doctor holding a clipboard"
					>
				</placeholder>
			</div>
		</div>
	</section>
</template>

<script>
	import { computed } from 'vue';
	import { useStore } from 'vuex';
	import messages from '@/messages';
	import { useMessages } from '@/composables/useMessages';
	import MethodCard from '@/domain/methods/MethodCard';

	export default {
		components: { MethodCard },

		setup() {
			const store = useStore();
			const { message } = useMessages(messages);

			const isLiveAvailable = computed(() => store.state.task.liveAvailable);
			const isOnDemandAvailable = computed(() => store.state.task.onDemandAvailable);
			
			return {
				message,
				isLiveAvailable,
				isOnDemandAvailable,
			}
		},
	};
</script>
