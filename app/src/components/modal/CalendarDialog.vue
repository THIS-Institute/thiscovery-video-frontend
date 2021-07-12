<template>
	<div>
		<p
			class="e-h3 max-w-sm mx-auto text-center"
			v-text="message('live.calendar.select')"
		/>

		<ul class="flex items-center justify-center space-x-4 mt-6">
			<li
				v-for="(item, index) in calendarUrls"
				:key="index"
			>
				<x-button
					:title="item.name"
					:icon="item.icon"
					:url="item.url"
					:target="item.name !== 'Apple' ? '_blank' : null"
					class="e-button--black-outline"
					flipped
					small
					external
					type="pill"
				/>
			</li>
		</ul>
	</div>

	<div class="flex items-center justify-center space-x-4 mt-5">
		<x-button
			title="Close"
			class="e-button--red-outline"
			small
			type="pill"
			@click="$emit('close')"
		/>
	</div>
</template>

<script>
	import messages from '@/messages';
	import { useMessages } from '@/composables/useMessages';

	export default {
		props: {
			selection: {
				type: String,
				required: true,
			},

			duration: {
				type: Number,
				default: 45,
			}
		},

		emits: [
			'close',
		],

		setup(props) {
			const { message } = useMessages(messages);

			const event = {
				name: message('live.calendar.title'),
				details: message('live.calendar.details'),
				location: message('live.calendar.location'),
				startsAt: props.selection,
				endsAt: new Date(new Date(props.selection).getTime() + (props.duration * 60000)),
			};

			const baseUrl = {
				google: 'https://calendar.google.com/calendar/render',
				outlook: 'https://outlook.live.com/owa',
			};

			const makeTime = (time) => new Date(time).toISOString().replace(/[-:]|\.\d{3}/g, '');

			const makeUrl = (base, query) => Object.keys(query)
				.reduce((accum, key, index) => {
					const value = query[key];

					if (value !== null) {
						return `${accum}${index === 0 ? '?' : '&'}${key}=${encodeURIComponent(value)}`;
					}

					return accum;
				}, base);

			const makeGoogleCalendarUrl = (event) => makeUrl(baseUrl.google, {
				action: 'TEMPLATE',
				dates: `${makeTime(event.startsAt)}/${makeTime(event.endsAt)}`,
				location: event.location,
				text: event.name,
				details: event.details,
			});

			const makeOutlookCalendarUrl = (event) => makeUrl(baseUrl.outlook, {
				rru: 'addevent',
				startdt: makeTime(event.startsAt),
				enddt: makeTime(event.endsAt),
				subject: event.name,
				location: event.location,
				body: event.details,
				allday: false,
				uid: new Date().getTime().toString(),
				path: '/calendar/view/Month',
			});

			const makeICSCalendarUrl = (event) => {
				const components = [
					'BEGIN:VCALENDAR',
					'VERSION:2.0',
					'BEGIN:VEVENT',
					`URL:${document.URL}`,
					`DTSTART:${makeTime(event.startsAt)}`,
					`DTEND:${makeTime(event.endsAt)}`,
					`SUMMARY:${event.name}`,
					`DESCRIPTION:${event.details}`,
					`LOCATION:${event.location}`,
					'END:VEVENT',
					'END:VCALENDAR',
				];

				return encodeURI(`data:text/calendar;charset=utf8,${components.join('\n')}`);
			};

			const calendarUrls = [
				{
					name: 'Apple',
					icon: 'apple',
					url: makeICSCalendarUrl(event),
				},
				{
					name: 'Google',
					icon: 'google',
					url: makeGoogleCalendarUrl(event),
				},
				{
					name: 'Outlook.com',
					icon: 'outlook',
					url: makeOutlookCalendarUrl(event),
				},
			];

			return {
				message,
				calendarUrls,
			};
		},
	};
</script>
