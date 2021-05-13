<template>
	<teleport to="body">
		<transition
			enter-active-class="transition-opacity ease-out duration-300"
			leave-active-class="transition-opacity ease-in delay-150 duration-200"
			enter-from-class="opacity-0"
			leave-to-class="opacity-0"
		>
			<span
				v-if="active"
				:class="[
					'fixed inset-0 w-full h-full',
					'bg-black bg-opacity-40 z-site-modal',
					'focus:outline-none',
				]"
				aria-hidden="true"
				@click="closeModal"
			/>
		</transition>

		<transition
			enter-active-class="transform transition-all ease-out duration-300"
			leave-active-class="transform transition-all ease-in duration-200"
			enter-from-class="opacity-0 translate-y-4 sm:scale-95"
			leave-to-class="opacity-0 translate-y-4 sm:scale-95"
			appear
		>
			<div
				v-if="active"
				:class="[
					'flex items-center justify-center',
					'fixed inset-0 w-full h-full z-site-modal',
					'pointer-events-none',
				]"
			>
				<div
					class="pointer-events-auto bg-white rounded-lg p-5 md:p-12"
					:class="$props.wrapperClass"
				>
					<slot />
				</div>
			</div>
		</transition>
	</teleport>
</template>

<script>
	import { computed } from 'vue';
	import { useStore } from 'vuex';
	import { useEscKey } from '@/composables/useKeyboard';

	export default {
		props: {
			wrapperClass: {
				type: String,
				default: null,
			},

			show: Boolean,
		},

		setup() {
			const store = useStore();
			const active = computed(() => store.state.app.modalActive);

			const closeModal = () => store.dispatch('app/closeModal');
			useEscKey(closeModal);

			return {
				closeModal,
				active,
			};
		},
	};
</script>
