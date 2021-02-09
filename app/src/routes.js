import PathSelectionView from './views/PathSelectionView';
import AppointmentSelectionView from './views/AppointmentSelectionView';
import Styleguide from './views/Styleguide';

import LayoutLanding from './layouts/Landing';
import LayoutAppointment from './layouts/Appointment';

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
		path: '/styleguide',
		component: Styleguide,
	},
];
