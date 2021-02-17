// Tools
import Styleguide from './views/Styleguide';

// Pages
import PathSelection from './views/PathSelection';
import AppointmentSelection from './views/AppointmentSelection';
import Instructions from './views/Instructions';
import DressingRoom from './views/DressingRoom';
import SelfRecord from './views/SelfRecord';
import LiveRoom from './views/LiveRoom';

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
				component: PathSelection,
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
				component: AppointmentSelection,
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
				component: Instructions,
			},
			{
				path: 'settings',
				name: 'self_settings',
				component: DressingRoom,
			},
			{
				path: 'interview',
				name: 'self_interview',
				component: SelfRecord,
				props: { hideNav: true },
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
				component: SelfRecord,
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
				component: Instructions,
			},
			{
				path: 'settings',
				name: 'live_settings',
				component: DressingRoom,
			},
		],
	},
	{
		path: '/live/room',
		component: LiveRoom,
		name: 'live_room',
	},
	{
		path: '/styleguide',
		component: Styleguide,
	},
];
