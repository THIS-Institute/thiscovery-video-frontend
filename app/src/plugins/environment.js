import env from '@/app.env';

export default {
	install: (app) => {
		app.config.globalProperties.$env = (key) => {
			return env[key];
		}
	},
}
