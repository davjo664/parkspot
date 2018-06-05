import {Platform} from 'react-native';

const config = {
  api: {
    devEnabled: false,

    dev: {
      protocol: 'http',
      host: Platform.OS === 'ios' ? 'localhost' : '10.0.2.2',
      port: 3000,
    },
    live: {
      protocol: 'https',
      host: 'parkspot.mi.hdm-stuttgart.de',
      port: 443,
      path: 'api',
    },

    get url() {
      const target = this.devEnabled ? this.dev : this.live;
      if (this.devEnabled) {
        return target.protocol + '://' + target.host + ':' + target.port + '/';
      } else {
        return target.protocol + '://' + target.host + ':' + target.port + '/' + target.path + '/';
      }
    }
  },
  googleApi: {
	  key: 'AIzaSyBtDPqZtRAMenSwz32oIUWWf1i_Gnub1dc'
  }

};

export default config;
