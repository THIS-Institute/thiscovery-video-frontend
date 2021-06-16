<template>
	<section class="bg-white rounded-lg flex flex-col justify-between">
		<div
			:class="[
				'px-5 md:px-11.25',
				!tutorial || !available ? 'py-6 md:py-10' : 'pt-6 md:pt-10',
			]"
		>
			<icon-text
				tag="h2"
				class="e-h3"
				:text="title"
				:icon="{
					name: icon,
					size: 'w-10 h-10',
					bg: available ? 'bg-pink' : 'bg-grey-200',
				}"
			/>

			<p
				class="mt-5"
				v-text="content"
			/>

			<ul
				v-if="available"
				class="flex flex-col mt-7 space-y-2.5"
			>
				<li
					v-for="(item, index) in items"
					:key="index"
					class="inline-flex items-center space-x-3.5"
				>
					<div
						:class="[
							'flex items-center justify-center',
							'rounded-full bg-aubergine p-2',
						]"
					>
						<icon
							name="check"
							class="text-white"
						/>
					</div>

					<span
						class="text-sm"
						v-text="item"
					/>
				</li>
			</ul>

			<x-button
				v-if="ctaTitle && ctaRoute && available"
				:title="ctaTitle"
				:url="{ name: ctaRoute }"
				icon="chevron-right"
				class="e-button--red mt-12"
				type="pill"
			/>
		</div>

		<info-bar
			v-if="tutorial && available"
			class="mt-10 p-2.5 pt-0"
			:class-list="{
				inner: 'xl:max-w-xs xl:mx-auto',
			}"
			:title="tutorial.title"
			:cta="{
				title: tutorial.cta.title,
				url: {
					name: tutorial.cta.route,
				},
			}"
		/>
	</section>
</template>

<script>
	import InfoBar from '@/components/InfoBar';

	export default {
		components: {
			InfoBar,
		},

		props: {
			title: {
				type: String,
				required: true,
			},

			icon: {
				type: String,
				default: 'camera',
			},

			content: {
				type: String,
				required: true,
			},

			items: {
				type: Array,
				default: null,
			},

			ctaTitle: {
				type: String,
				default: null,
			},

			ctaRoute: {
				type: String,
				default: null,
			},

			tutorial: {
				type: Object,
				default: null,
			},

			available: Boolean,
		},
	};
</script>
