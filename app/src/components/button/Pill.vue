<template>
	<component
		:is="element"
		class="rounded-full space-x-1/2em border-2"
		:class="[
			small ? 'text-sm px-5 py-3.5' : 'px-6 py-4',
			{
				'disabled:bg-grey-200 disabled:text-white disabled:border-grey-200': cDisabled && cDisabled.disabled,
				'flex-row-reverse space-x-reverse': flipped,
			},
		]"
		v-bind="{
			...location,
			...cDisabled,
		}"
	>
		<span
			class="inline-block"
			v-text="title"
		/>

		<icon
			v-if="icon || icons"
			:name="icon"
			:names="icons"
			size="w-em h-em"
		/>
	</component>
</template>

<script>
	import { computed } from 'vue';

	export default {
		props: {
			title: {
				type: String,
				required: true,
			},

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
			flipped: Boolean,
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
