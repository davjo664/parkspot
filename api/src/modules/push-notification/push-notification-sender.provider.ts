import * as admin from 'firebase-admin';
import {FirebaseApp} from '../firebase-app/firebase-app.provider';


/**
 * I am a wrapper to the firebase interace. At some point it might be required to pass the default app initialisation to me.
 * Then use a Factory to provide me and inject the configuration. */
export class PushNotificationSender {
  async send(message: admin.messaging.Message, dryRun?: boolean): Promise<string> {
    return admin.messaging().send(message, dryRun);
  }
}


/**
 * I am the mock of the sender wrapper. So that the external dependency to firebase-admin can be
 * replaced during tests. I'll submit any message "successful".  */
class PushNotificationSenderMock implements Partial<PushNotificationSender> {
  async send(message: admin.messaging.Message, dryRun?: boolean): Promise<string> {
    return Promise.resolve('I have no idea what the actual return is atm!');
  }
}

/**
 * I am the actual provider for nest*/
export const pushNotificationProvider = {
  provide: PushNotificationSender,
  /*Firebase App is currently not required but this ensures app is initialized before usage*/
  useFactory: (x: FirebaseApp) => new PushNotificationSender(),
  inject: [FirebaseApp],
};


/**
 * I am the actual provider during tests */
export const pushNotificationMockProvider = {
  provide: PushNotificationSender,
  useFactory: () => new PushNotificationSenderMock(),
  inject: [],
};


