import * as constant from './routeConstants';

// Tools
const Styleguide = () => import('./views/Styleguide');

// Pages
const MethodSelectionView = () => import('./views/MethodSelection');
const MethodOverviewView = () => import('./views/MethodOverview');
const BookAppointmentView = () => import('./views/BookAppointment');
const PreSettingsView = () => import('./views/PreSettings');
const SelfRecordView = () => import('./views/SelfRecord');
const LiveRoomView = () => import('./views/LiveRoom');
const LiveLandingView = () => import('./views/LiveLanding');
const PathNotFound = () => import('./views/PathNotFound');

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
			hasBack: false,
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
				props: {
					earlyReturn: false,
				},
			},
			{
				path: 'settings',
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

	{
		path: '/:pathMatch(.*)*',
		component: FullBackgroundLayout,
		props: {
			backgroundType: 'curls',
			hasNav: false,
			hasBack: false,
		},
		children: [
			{
				path: '',
				component: PathNotFound,
			},
		],
	},
];
