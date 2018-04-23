// @flow
import boot from './src/boot/index';
import codePush from 'react-native-code-push';
const app = codePush(boot());

export default app;
