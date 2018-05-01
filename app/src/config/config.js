import { Platform } from 'react-native';

const config = {
	api: {
		devEnabled: false,

		dev: {
			protocol: 'http',
			host: Platform.OS === 'ios' ? 'localhost' : '10.0.2.2',
			port: 3000,
			path: 'parkspot',
		},
		live: {
			protocol: 'https',
			host: 'parkspot.mi.hdm-stuttgart.de',
			port: 443,
			path: 'api/parkspot',
		},

		get url() {
			const target = this.devEnabled ? this.dev : this.live;

			return target.protocol + '://' + target.host + ':' + target.port + '/' + target.path + '/';
		},
	},

};

export default config;
