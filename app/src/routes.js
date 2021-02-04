import PathSelectionView from './views/PathSelectionView';
import Appointment from './views/Appointment';
import Styleguide from './views/Styleguide';

import LayoutLanding from './layouts/Landing';
import LayoutAppointment from './layouts/Appointment';

export const routes = [
	{
		path: '/',
		component: LayoutLanding,
		children: [
			{ path: '', component: PathSelectionView }
		],
	},
	{
		path: '/appointment',
		component: LayoutAppointment,
		children: [
			{ path: '', component: Appointment }
		],
	},
	{
		path: '/styleguide',
		component: Styleguide,
	},
];
