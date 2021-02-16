// Tools
import Styleguide from './views/Styleguide';

// Pages
import PathSelection from './views/PathSelection';
import AppointmentSelection from './views/AppointmentSelection';
import Instructions from './views/Instructions';
import DressingRoom from './views/DressingRoom';
import SelfRecord from './views/SelfRecord';

// Layouts
import LayoutLanding from './layouts/Landing';
import LayoutAppointment from './layouts/Appointment';
import LayoutOnDemand from './layouts/OnDemand';

export const routes = [
	{
		path: '/',
		component: LayoutLanding,
		children: [
			{
				path: '',
				component: PathSelection,
			},
		],
	},
	{
		path: '/appointment',
		component: LayoutAppointment,
		children: [
			{
				path: '',
				component: AppointmentSelection,
			},
		],
	},
	{
		path: '/on-demand',
		component: LayoutOnDemand,
		children: [
			{
				path: 'instructions',
				component: Instructions,
			},
			{
				path: 'dressing-room',
				component: DressingRoom,
			},
		],
	},
	{
		path: '/on-demand',
		component: LayoutOnDemand,
		children: [
			{
				path: 'interview',
				component: SelfRecord,
			},
		],
		props: {
			hideNav: true,
		},
	},
	{
		path: '/styleguide',
		component: Styleguide,
	},
];
