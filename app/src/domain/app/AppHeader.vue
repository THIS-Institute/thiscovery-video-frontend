<template>
	<header class="relative flex items-center h-24 z-site-header">
		<div class="e-container w-full flex items-center justify-between">
			<div class="inline-flex items-center w-full">
				<div class="flex-shrink-0 w-full max-w-logo">
					<router-link
						to="/"
						aria-label="Thiscovery.org"
					>
						<placeholder
							ratio="pt-logo"
							tag="span"
						>
							<icon
								class="text-red"
								size="w-full h-full"
								name="logo"
							/>
						</placeholder>
					</router-link>
				</div>

				<nav class="flex-shrink-0 ml-16 hidden lg:block">
					<navigation-links />
				</nav>
			</div>

			<a
				v-if="user"
				class="bg-white rounded-full border-2 border-red p-1 pr-5 hidden lg:block"
				href="#"
			>
				<div class="flex items-center justify-between space-x-3.5">
					<img
						:class="[
							'inline-flex items-center justify-center',
							'w-8 h-8 text-sm',
							'rounded-full bg-red text-white',
						]"
						:src="user.picture"
					>

					<span
						class="text-red"
						v-text="user.given_name"
					/>
				</div>
			</a>

			<button
				:class="[
					'flex items-center justify-center',
					'rounded-full bg-red p-3 focus:outline-none',
					'lg:hidden',
				]"
				aria-label="Main menu"
				@click="onToggleNav"
			>
				<placeholder
					ratio="pt-full"
					class="w-4.5 h-4.5"
					tag="span"
				>
					<icon
						class="text-white"
						:name="navActive ? 'nav-close' : 'burger'"
					/>
				</placeholder>
			</button>
		</div>
	</header>
</template>

<script>
	import { computed } from '@vue/runtime-core';
	import { useStore } from 'vuex';

	import NavigationLinks from './NavigationLinks';

	export default {
		components: { NavigationLinks },

		props: {
			navActive: Boolean,
		},

		setup() {
			const store = useStore();
			const onToggleNav = () => store.commit('app/toggleNav');

			const user = computed(() => store.state.user.user);

			return {
				user,
				onToggleNav,
			};
		},
	};
</script>
