// Tools
import Styleguide from './views/Styleguide';

// Pages
import MethodSelectionView from './views/MethodSelection';
import MethodOverviewView from './views/MethodOverview';
import BookAppointmentView from './views/BookAppointment';
import PreSettingsView from './views/PreSettings';
import SelfRecordView from './views/SelfRecord';
import LiveRoomView from './views/LiveRoom';

// Layouts
import FullBackgroundLayout from './layouts/FullBackground';
import SplitBackgroundLayout from './layouts/SplitBackground';

/* eslint-env node */
const content = require('../content.json');

export const routes = [
	/**
	 * Method selection
	 */
	{
		path: '/',
		component: FullBackgroundLayout,
		props: { backgroundType: 'waves', hasBack: false },
		children: [
			{
				path: '',
				name: 'home',
				component: MethodSelectionView,
				props: {
					title: content.landing.title,
					content: content.landing.content,
					paths: content.landing.paths,
				},
			},
		],
	},

	/**
	 * Appointment booking
	 */
	{
		path: '/appointments',
		component: SplitBackgroundLayout,
		props: { backgroundType: 'curls' },
		children: [
			{
				path: '',
				name: 'appointments',
				component: BookAppointmentView,
				props: {
					title: content.live.appointments.title,
					content: content.live.appointments.content,
					slots: content.live.appointments.slots,
				},
			},
		],
	},

	/**
	 * Self-record interviews
	 */
	{
		path: '/self-record',
		component: FullBackgroundLayout,
		props: { backgroundType: 'scratches' },
		children: [
			{
				path: '',
				name: 'self_howto',
				component: MethodOverviewView,
				props: {
					instructions: content.selfRecord.methodOverview.instructions,
				},
			},
			{
				path: 'settings',
				name: 'self_settings',
				component: PreSettingsView,
				props: {
					title: content.selfRecord.preSettings.title,
					content: content.selfRecord.preSettings.content,
					cta: content.selfRecord.preSettings.cta,
				},
			},
		],
	},
	{
		path: '/self-record',
		component: FullBackgroundLayout,
		props: {
			backgroundType: 'scratches',
			hasNav: false,
			hasBack: false
		},
		children: [
			{
				path: 'interview',
				name: 'self_interview',
				component: SelfRecordView,
				props: {
					sections: content.selfRecord.interview.sections,
				},
			},
		],
	},

	/**
	 * Live interviews
	 */
	{
		path: '/live',
		component: FullBackgroundLayout,
		props: { backgroundType: 'curls' },
		children: [
			{
				path: '',
				name: 'live_home',
				component: MethodOverviewView,
			},
			{
				path: 'settings',
				name: 'live_settings',
				component: PreSettingsView,
				props: {
					title: content.live.preSettings.title,
					content: content.live.preSettings.content,
					cta: content.live.preSettings.cta,
				},
			},
		],
	},
	{
		path: '/live/room',
		component: LiveRoomView,
		name: 'live_room',
		props: {
			questions: content.live.room.questions,
		},
	},

	/**
	 * Styleguide
	 */
	{
		path: '/styleguide',
		component: Styleguide,
	},
];
