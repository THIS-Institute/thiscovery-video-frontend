<template>
	<component
		:is="element"
		class="rounded-full border p-3.5"
		:class="[
			{
				'text-sm': small,
				'disabled:bg-grey-200 disabled:text-white disabled:border-grey-200': cDisabled && cDisabled.disabled,
			},
		]"
		v-bind="{
			...location,
			...cDisabled,
		}"
	>
		<icon
			v-if="icon || icons"
			:name="icon"
			:names="icons"
			size="w-1.25em h-1.25em"
		/>
	</component>
</template>

<script>
	import { computed } from 'vue';

	export default {
		props: {
			element: {
				type: String,
				required: true,
			},

			location: {
				type: [String, Object],
				default: null,
			},

			icon: {
				type: String,
				default: null,
			},

			icons: {
				type: Array,
				default: null,
			},

			small: Boolean,
			external: Boolean,
			disabled: Boolean,
		},

		setup(props) {
			const cDisabled = computed(() => {
				return props.element === 'button'
					? { disabled: props.disabled }
					: null;
			});

			return {
				cDisabled,
			};
		}
	};
</script>
