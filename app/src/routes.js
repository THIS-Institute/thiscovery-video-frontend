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
			},
			{
				path: 'settings',
				name: 'self_settings',
				component: PreSettingsView,
				props: { domain: 'solo', nextRoute: 'self_interview' },
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
		path: '/live/:id',
		component: FullBackgroundLayout,
		props: { backgroundType: 'curls' },
		children: [
			{
				path: '',
				name: 'live_landing',
				component: LiveLandingView,
			},
			{
				path: '',
				name: 'live_settings',
				component: PreSettingsView,
				props: { domain: 'live', nextRoute: 'live_room' },
			},
		],
	},
	{
		path: '/live/:id/room',
		component: LiveRoomView,
		name: 'live_room',
	},

	/**
	 * Styleguide
	 */
	{
		path: '/styleguide',
		component: Styleguide,
	},
];
