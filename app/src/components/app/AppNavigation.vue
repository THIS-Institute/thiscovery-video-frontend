<template>
	<div class="absolute inset-0 w-full h-full bg-white z-site-navigation lg:hidden">
		<div class="e-container h-full flex items-center">
			<nav>
				<ul class="inline-flex flex-col space-y-12">
					<li
						v-for="(link, index) in nav"
						:key="index"
					>
						<nav-link
							class="e-h1"
							v-bind="link"
						/>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</template>

<script>
	import NavLink from '@/components/ui/NavLink';

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
		},
	};
</script>
