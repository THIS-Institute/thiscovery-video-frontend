import * as constant from './routeConstants';

import { hasAppointmentGuard, hasAppointmentTodayGuard } from '@/domain/appointments/routeGuards';
import { hasRoomTokenGuard } from '@/domain/interviews/routeGuards';

// Tools
const Styleguide = () => import('./views/Styleguide');

// Pages
const MethodSelectionView = () => import('./views/MethodSelection');
const MethodOverviewView = () => import('./views/MethodOverview');
const BookAppointmentView = () => import('./views/BookAppointment');
const AppointmentStatusView = () => import('./views/AppointmentStatus');
const PreSettingsView = () => import('./views/PreSettings');
const SelfRecordView = () => import('./views/SelfRecord');
const LiveRoomView = () => import('./views/LiveRoom');
const LiveLandingView = () => import('./views/LiveLanding');
const TaskNotFound = () => import('./views/TaskNotFound');
const PathNotFound = () => import('./views/PathNotFound');

// Layouts
import FullBackgroundLayout from './layouts/FullBackground';
import SplitBackgroundLayout from './layouts/SplitBackground';

import AuthReturn from './auth/AuthReturn';

export const routes = [
	/**
	 * Method selection
	 */
	{
		path: '/',
		component: FullBackgroundLayout,
		props: { backgroundType: 'waves', hasBack: false },
		meta: { requiresTaskInit: true },
		children: [
			{
				path: '',
				name: constant.ROUTE_HOME,
				component: MethodSelectionView,
				beforeEnter: [ hasAppointmentTodayGuard ],
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
		meta: { requiresTaskInit: true },
		children: [
			{
				path: '',
				name: constant.ROUTE_APPOINTMENTS,
				component: BookAppointmentView,
				beforeEnter: [ hasAppointmentGuard ],
			},
			{
				path: 'status',
				name: constant.ROUTE_APPOINTMENT_STATUS,
				component: AppointmentStatusView,
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
		meta: { requiresTaskInit: true },
		children: [
			{
				path: '',
				name: constant.ROUTE_SELF_HOWTO,
				component: MethodOverviewView,
				props: {
					domain: 'selfRecord',
				},
			},
			{
				path: 'settings',
				name: constant.ROUTE_SELF_SETTINGS,
				component: PreSettingsView,
				props: {
					domain: 'selfRecord',
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
		meta: { requiresTaskInit: true },
		children: [
			{
				path: 'interview',
				name: constant.ROUTE_SELF_INTERVIEW,
				component: SelfRecordView,
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
		beforeEnter: [ hasRoomTokenGuard ],
	},
	{
		path: '/live',
		component: FullBackgroundLayout,
		props: { backgroundType: 'curls' },
		children: [
			{
				path: '',
				name: constant.ROUTE_LIVE_HOWTO,
				component: MethodOverviewView,
				props: {
					domain: 'live',
				},
			},
		],
	},

	/**
	 * Styleguide
	 */
	{
		path: '/styleguide',
		component: Styleguide,
	},

	/**
	 * Auth return capture
	 */
	{
		path: '/auth-return',
		component: AuthReturn,
	},

	{
		path: '/no-task',
		component: FullBackgroundLayout,
		props: {
			backgroundType: 'curls',
			hasNav: false,
			hasBack: false,
		},
		children: [
			{
				path: '',
				name: constant.ROUTE_NO_TASK,
				component: TaskNotFound,
			},
		],
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
