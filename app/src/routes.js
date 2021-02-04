import PathSelectionView from './views/PathSelectionView';
import Appointment from './views/Appointment';
import Styleguide from './views/Styleguide';

import LayoutLanding from './layouts/Landing';
import LayoutAppointment from './layouts/Appointment';

export const routes = [
	{
		path: '/',
		component: PathSelectionView,
		meta: {
			layout: LayoutLanding,
		},
	},
	{
		path: '/appointment',
		component: Appointment,
		meta: {
			layout: LayoutAppointment,
		},
	},
	{
		path: '/styleguide',
		component: Styleguide,
	},
];
