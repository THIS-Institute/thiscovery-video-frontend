<template>
	<div class="e-container mt-12 xl:mt-16">
		<div class="grid grid-cols-12 gap-5 w-full">
			<div class="col-span-12 sm:col-span-8 sm:col-start-3 lg:col-span-4 lg:col-start-5">
				<div class="bg-white rounded-lg w-full">
					<div class="p-2.5 pb-16 w-full">
						<placeholder class="rounded-lg overflow-hidden">
							<span class="bg-black" />
						</placeholder>

						<div class="flex flex-col items-center mt-12">
							<h2 class="e-h3 text-center">
								All set to begin?
							</h2>

							<p class="text-sm text-center mt-1.5">
								Access to your microphone is required. Video access is encouraged but you can disable your camera using the controls above if you wish.
							</p>

							<e-button
								title="See the first question"
								icon="chevron-right"
								class="e-button--red mt-5"
								url="/on-demand/interview"
								pill
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
