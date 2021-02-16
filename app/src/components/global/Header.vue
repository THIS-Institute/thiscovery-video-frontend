<template>
	<header class="relative flex items-center h-24 z-site-header">
		<div class="e-container w-full flex items-center justify-between">
			<div class="inline-flex items-center w-full">
				<div class="flex-shrink-0 w-full max-w-logo">
					<router-link to="/">
						<placeholder ratio="pt-logo">
							<icon
								class="text-red"
								size="w-full h-full"
								name="logo"
							/>
						</placeholder>
					</router-link>
				</div>

				<nav class="flex-shrink-0 ml-16 hidden lg:block">
					<ul class="inline-flex items-center space-x-12">
						<li
							v-for="(link, index) in nav"
							:key="index"
						>
							<nav-link v-bind="link" />
						</li>
					</ul>
				</nav>
			</div>

			<a
				v-if="profile"
				class="bg-white rounded-full border-2 border-red p-1 pr-5 hidden lg:block"
				href="#"
			>
				<div class="flex items-center justify-between space-x-3.5">
					<span
						:class="[
							'inline-flex items-center justify-center',
							'w-8 h-8 text-sm',
							'rounded-full bg-red text-white',
						]"
						v-text="profile.initials"
					/>

					<span
						class="text-red"
						v-text="profile.name"
					/>
				</div>
			</a>

			<button
				:class="[
					'flex items-center justify-center',
					'rounded-full bg-red p-3 focus:outline-none',
					'lg:hidden',
				]"
				@click="toggle"
			>
				<placeholder
					ratio="pt-full"
					class="w-4.5 h-4.5"
				>
					<transition
						enter-active-class="transition-opacity duration-150"
						leave-active-class="transition-opacity duration-150"
						enter-class="opacity-0"
						leave-to-class="opacity-0"
						mode="out-in"
					>
						<icon
							:key="navActive"
							class="text-white"
							:name="navActive ? 'nav-close' : 'burger'"
						/>
					</transition>
				</placeholder>
			</button>
		</div>
	</header>
</template>

<script>
	import NavLink from '@/components/common/NavLink';

	import { store } from '@/store/index';

	export default {
		components: {
			NavLink,
		},

		props: {
			nav: {
				type: Array,
				required: true,
			},

			profile: {
				type: Object,
				default: null,
			},

			navActive: Boolean,
		},

		setup() {
			const toggle = () => store.commit('app/toggle');

			return {
				toggle,
			};
		},
	};
</script>
