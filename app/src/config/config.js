import { Platform } from 'react-native';

const config = {
  api: {
    protocol: __DEV__ ? 'http' : 'https',
    host: __DEV__
      ? Platform.OS === 'ios'
        ? 'localhost'
        : '10.0.2.2'
      : 'https://parkspot.mi.hdm-stuttgart.de/api/parkspot/',

    port: __DEV__ ? 3000 : 443,
    path: 'parkspot',

    get url() {
      return (
        this.protocol +
        '://' +
        this.host +
        ':' +
        this.port +
        '/' +
        this.path +
        '/'
      );
    },
  },
};

export default config;
