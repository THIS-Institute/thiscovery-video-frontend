import * as constant from './routeConstants';

// Tools
import Styleguide from './views/Styleguide';

// Pages
import MethodSelectionView from './views/MethodSelection';
import MethodOverviewView from './views/MethodOverview';
import BookAppointmentView from './views/BookAppointment';
import PreSettingsView from './views/PreSettings';
import SelfRecordView from './views/SelfRecord';
import LiveRoomView from './views/LiveRoom';
import LiveLandingView from './views/LiveLanding';

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
				name: constant.ROUTE_HOME,
				component: MethodSelectionView,
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
				name: constant.ROUTE_APPOINTMENTS,
				component: BookAppointmentView,
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
				name: constant.ROUTE_SELF_HOWTO,
				component: MethodOverviewView,
			},
			{
				path: 'settings',
				name: constant.ROUTE_SELF_SETTINGS,
				component: PreSettingsView,
				props: {
					domain: 'solo',
					nextRoute: constant.ROUTE_SELF_INTERVIEW,
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
				name: constant.ROUTE_SELF_INTERVIEW,
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
		path: '/live/:id',
		component: FullBackgroundLayout,
		props: { backgroundType: 'curls' },
		children: [
			{
				path: '',
				name: constant.ROUTE_LIVE_LANDING,
				component: LiveLandingView,
			},
			{
				path: '',
				name: constant.ROUTE_LIVE_SETTINGS,
				component: PreSettingsView,
				props: {
					domain: 'live',
					nextRoute: constant.ROUTE_LIVE_ROOM,
				},
			},
		],
	},
	{
		path: '/live/:id/room',
		component: LiveRoomView,
		name: constant.ROUTE_LIVE_ROOM,
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
