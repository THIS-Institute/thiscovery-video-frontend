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
					title: content.methodSelection.title,
					content: content.methodSelection.content,
					paths: content.methodSelection.paths,
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
					title: content.appointments.title,
					content: content.appointments.content,
					slots: content.appointments.slots,
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
					instructions: content.methodOverview.instructions,
				},
			},
			{
				path: 'settings',
				name: 'self_settings',
				component: PreSettingsView,
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
			},
		],
	},
	{
		path: '/live/room',
		component: LiveRoomView,
		name: 'live_room',
		props: {
			questions: content.liveRoom.questions,
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
