<template>
	<ul
		:class="[
			'inline-flex',
			mobileLayout ? 'flex-col space-y-12' : 'items-center space-x-12',
		]"
	>
		<li>
			<nav-link
				title="Home"
				url="https://www.thiscovery.org/"
			/>
		</li>

		<li>
			<nav-link
				title="About"
				url="https://www.thiscovery.org/about"
			/>
		</li>

		<li>
			<nav-link
				title="Contact us"
				url="https://www.thiscovery.org/contact-us"
			/>
		</li>
	</ul>
</template>

<script>
	import NavLink from '@/components/ui/NavLink';

	export default {
		components: { NavLink },

		props: {
			mobileLayout: {
				type: Boolean,
				default: false,
			},
		},
	};
</script>
