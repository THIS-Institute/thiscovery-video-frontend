import PathSelectionView from './views/PathSelectionView';
import AppointmentSelectionView from './views/AppointmentSelectionView';
import Instructions from './views/Instructions';
import Styleguide from './views/Styleguide';

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
				component: PathSelectionView,
			},
		],
	},
	{
		path: '/appointment',
		component: LayoutAppointment,
		children: [
			{
				path: '',
				component: AppointmentSelectionView,
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
		],
	},
	{
		path: '/styleguide',
		component: Styleguide,
	},
];
