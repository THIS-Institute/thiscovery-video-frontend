<template>
	<svg
		:class="[
			'inline-block fill-current align-top',
			$props.size,
		]"
	>
		<use
			v-for="iconName in cNames"
			:key="iconName"
			:xlink:href="`${$props.sprite}#${iconName}`"
			v-bind="$props.use"
		/>
	</svg>
</template>

<script>
	import { computed } from 'vue';

	export default {
		props: {
			name: {
				type: String,
				default: null,
			},

			names: {
				type: Array,
				default: null,
			},

			sprite: {
				type: String,
				default: '/static/img/sprite.svg',
			},

			use: {
				type: Object,
				default: null,
			},

			size: {
				type: String,
				default: 'w-em h-em',
			},
		},

		setup(props) {
			const cNames = computed(() => {
				return props.names || [props.name];
			});
		
			return {
				cNames,
			};
		},
	};
</script>
