<template>
	<header
		:class="[
			'flex items-center h-24 z-site-header',
			$props.navActive ? 'sticky top-0 inset-x-0' : 'relative',
		]"
	>
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
				v-if="hasUser"
				:href="`${ $env('parentDomain') }/my-tasks`"
				:class="[
					'group',
					'p-1 pr-5',
					'bg-white rounded-full',
					'border-2 border-red',
					'hidden lg:block',
					'focus:ring-2 focus:ring-blue focus:outline-none',
					'transition-colors duration-200 hover:bg-red',
				]"
			>
				<span class="flex items-center justify-between space-x-3.5">
					<span
						:class="[
							'inline-flex items-center justify-center',
							'w-8 h-8 text-sm',
							'rounded-full bg-red text-white',
							'transition-colors duration-200',
							'group-hover:bg-white group-hover:text-red',
						]"
						v-text="userIntials"
					/>

					<span
						class="transition-colors duration-200 text-red group-hover:text-white"
						v-text="userGivenName"
					/>
				</span>
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
	import { useStore } from 'vuex';
	import { useUser } from '@/auth/useUser';

	import NavigationLinks from './NavigationLinks';

	export default {
		components: { NavigationLinks },

		props: {
			navActive: Boolean,
		},

		setup() {
			const store = useStore();

			const {
				hasUser,
				userGivenName,
				userIntials,
			} = useUser();

			const onToggleNav = () => store.commit('app/toggleNav');

			return {
				hasUser,
				userGivenName,
				userIntials,
				onToggleNav,
			};
		},
	};
</script>
