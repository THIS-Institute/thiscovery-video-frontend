<template>
	<teleport to="body">
		<transition
			enter-active-class="transition-opacity ease-out duration-300"
			leave-active-class="transition-opacity ease-in delay-150 duration-200"
			enter-from-class="opacity-0"
			leave-to-class="opacity-0"
		>
			<span
				v-if="modal.type"
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
				v-if="modal.type"
				:class="[
					'flex items-center justify-center',
					'fixed inset-0 w-full h-full z-site-modal',
					'pointer-events-none',
				]"
				role="dialog"
			>
				<div
					class="pointer-events-auto bg-white rounded-lg p-5 w-full md:p-12"
					:class="$props.wrapperClass"
				>
					<component
						:is="modal.type"
						v-bind="modal.value"
						v-on="modal.callbacks ? modal.callbacks : {}"
						@close="closeModal"
					/>
				</div>
			</div>
		</transition>
	</teleport>
</template>

<script>
	import { computed } from 'vue';
	import { useStore } from 'vuex';
	import { useEscKey } from '@/composables/useKeyboard';

	import Confirm from './ConfirmDialog.vue';
	import Phone from './JoinByPhone.vue';
	import Comment from './CommentDialog.vue';
	import Troubleshoot from './TroubleShooting.vue';

	export default {
		components: {
			Confirm,
			Phone,
			Comment,
			Troubleshoot,
		},

		props: {
			wrapperClass: {
				type: String,
				default: 'max-w-xl',
			},
		},

		setup() {
			const store = useStore();
			const modal = computed(() => store.state.app.modal);

			const closeModal = () => store.dispatch('app/closeModal');

			useEscKey(closeModal);

			return {
				closeModal,
				modal,
			};
		},
	};
</script>
