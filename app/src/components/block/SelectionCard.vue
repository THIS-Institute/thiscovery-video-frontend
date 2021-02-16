<template>
	<section class="bg-white rounded-lg flex flex-col justify-between">
		<div
			:class="[
				'px-11.25',
				!tutorial || !available ? 'py-10' : 'pt-10',
			]"
		>
			<div class="flex items-center space-x-4">
				<div
					:class="[
						'flex items-center justify-center',
						'rounded-full p-4',
						available ? 'bg-pink' : 'bg-grey-200',
					]"
				>
					<icon
						:name="icon"
						class="e-h2"
					/>
				</div>

				<h1
					class="e-h3"
					v-text="title"
				/>
			</div>

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

			<e-button
				v-if="cta && available"
				v-bind="cta"
				icon="chevron-right"
				class="e-button--red mt-12"
				pill
			/>
		</div>

		<div
			v-if="tutorial && available"
			class="mt-10 p-2.5 pt-0"
		>
			<div class="bg-grey-100 rounded-md">
				<p class="flex flex-wrap justify-center gap-x-2 p-4 text-sm">
					<span v-text="tutorial.title" />

					<router-link
						class="text-red hover:text-black"
						:to="tutorial.cta.url"
						v-text="tutorial.cta.title"
					/>
				</p>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
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

			cta: {
				type: Object,
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
