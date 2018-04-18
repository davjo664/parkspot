import {Platform} from 'react-native';

const config = {
	api : {
		protocol : 'http',
		host : Platform.OS === 'ios' ? 'localhost' : '10.0.2.2',
		port : 3000,
		path : 'parkspot',

		get url () {
			return this.protocol + '://' + this.host + ':' + this.port + '/' + this.path + '/';
		},
	},
};

export default config;
