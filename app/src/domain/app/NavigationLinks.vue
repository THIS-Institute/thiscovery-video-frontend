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
				:url="`${ $env('parentDomain') }/`"
			/>
		</li>

		<li>
			<nav-link
				title="About"
				:url="`${ $env('parentDomain') }/about`"
			/>
		</li>

		<li>
			<nav-link
				title="Contact us"
				:url="`${ $env('parentDomain') }/contact-us`"
			/>
		</li>
	</ul>
</template>

<script>
	import NavLink from '@/components/NavLink';

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
