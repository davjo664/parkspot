import * as admin from 'firebase-admin';
import {FirebaseApp} from '../firebase-app/firebase-app.provider';


/**
 * I am a wrapper to the firebase interace. At some point it might be required to pass the default app initialisation to me.
 * Then use a Factory to provide me and inject the configuration. */
export class PushNotificationSender {
  async send(title: string, text: string, token: string, data: { [key: string]: string }): Promise<admin.messaging.MessagingDevicesResponse> {

    console.log("data", data);
    return admin.messaging().sendToDevice(token, {
      data: data,
      notification: {
        title,
        text,
      }
    });
  }


  async sendSilent(token: string, data: { [key: string]: string }, contentAvailable: boolean) {


    console.log('data', data);
    return admin.messaging().sendToDevice(token, {
      data: data,
    }, {
      contentAvailable,
    });
  }
}


/**
 * I am the mock of the sender wrapper. So that the external dependency to firebase-admin can be
 * replaced during tests. I'll submit any message "successful".  */
class PushNotificationSenderMock implements Partial<PushNotificationSender> {
  async send(title: string, text: string, token: string, data: { [key: string]: string }): Promise<admin.messaging.MessagingDevicesResponse> {
    return Promise.resolve({
      canonicalRegistrationTokenCount: 1,
      failureCount: 0,
      multicastId: 0,
      results: [],
      successCount: 1,
    });
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


