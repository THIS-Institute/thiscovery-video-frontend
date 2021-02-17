// Tools
import Styleguide from './views/Styleguide';

// Pages
import MethodSelectionView from './views/MethodSelection';
import AppointmentsView from './views/Appointments';
import TutorialView from './views/Tutorial';
import PreSettingsView from './views/PreSettings';
import SelfRecordView from './views/SelfRecord';
import LiveRoomView from './views/LiveRoom';

// Layouts
import LayoutFullBackground from './layouts/FullBackground';
import LayoutSplitBackground from './layouts/SplitBackground';

export const routes = [
	{
		path: '/',
		component: LayoutFullBackground,
		props: { backgroundType: 'waves', hasBack: false },
		children: [
			{
				path: '',
				name: 'home',
				component: MethodSelectionView,
			},
		],
	},
	{
		path: '/appointments',
		component: LayoutSplitBackground,
		props: { backgroundType: 'curls' },
		children: [
			{
				path: '',
				name: 'appointments',
				component: AppointmentsView,
			},
		],
	},
	{
		path: '/self-record',
		component: LayoutFullBackground,
		props: { backgroundType: 'scratches' },
		children: [
			{
				path: '',
				name: 'self_howto',
				component: TutorialView,
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
		component: LayoutFullBackground,
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
	{
		path: '/live',
		component: LayoutFullBackground,
		props: { backgroundType: 'curls' },
		children: [
			{
				path: '',
				name: 'live_home',
				component: TutorialView,
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
	},
	{
		path: '/styleguide',
		component: Styleguide,
	},
];
