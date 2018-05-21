// @flow
import boot from './src/boot/index';
import codePush from 'react-native-code-push';
const app = __DEV__
  ? boot()
  : codePush({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE,
    })(boot());

export default app;
