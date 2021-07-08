<template>
	<component
		:is="type"
		class="inline-flex items-center leading-snug transition-all duration-300 focus:outline-none"
		v-bind="{
			title,
			srOnly,
			icon,
			icons,
			location,
			element,
			flipped,
			small,
		}"
	/>
</template>

<script>
	import { computed } from 'vue';

	import Icon from '@/components/button/Icon.vue';
	import Time from '@/components/button/Time.vue';
	import Pill from '@/components/button/Pill.vue';
	import Subtle from '@/components/button/Subtle.vue';

	export default {
		components: {
			Icon,
			Time,
			Pill,
			Subtle,
		},

		props: {
			title: {
				type: String,
				default: null,
			},

			srOnly: {
				type: String,
				default: null,
			},

			url: {
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

			type: {
				type: String,
				default: null,
			},

			flipped: Boolean,
			external: Boolean,
			small: Boolean,
		},

		setup(props) {
			const element = computed(() => {
				if (props.external) return 'a';

				return props.url ? 'router-link' : 'button';
			});

			const location = computed(() => {
				if (props.url && !props.external) {
					return {
						to: props.url,
					}
				} else if (props.url && props.external) {
					return {
						href: props.url,
					}
				}

				return null;
			});

			return {
				element,
				location,
			};
		},
	};
</script>
