<template>
	<teleport
		v-if="active"
		to="body"
	>
		<div
			:class="[
				'flex items-center justify-center',
				'fixed inset-0 w-full h-full',
				'bg-black bg-opacity-40 z-site-modal',
			]"
		>
			<div
				class="bg-white rounded-lg p-5 md:p-12"
				:class="$props.wrapperClass"
			>
				<slot />
			</div>
		</div>
	</teleport>
</template>

<script>
	import { computed } from 'vue';
	import { useStore } from 'vuex';

	export default {
		props: {
			wrapperClass: {
				type: String,
				default: null,
			},
		},

		setup() {
			const store = useStore();
			const active = computed(() => store.state.app.modalActive);

			return {
				active,
			};
		},
	};
</script>
