import {Test, TestingModule} from '@nestjs/testing';
import {PushNotificationService} from './push-notification.service';
import {FCMTokenType} from '../user/fcm-token-type.enum';
import {pushNotificationMockProvider} from './push-notification-sender.provider';
import {configMockProviders} from '../config/config.providers';
import {firebaseAppProvider} from '../firebase-app/firebase-app.provider';

describe('PushNotificationService', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      modules: [],
      components: [
        firebaseAppProvider,
        ...configMockProviders,
        pushNotificationMockProvider,
        PushNotificationService
      ],
    }).compile();
  });

  describe('delivering Notifications', () => {
    it('should send', async () => {

      const service = app.get<PushNotificationService>(PushNotificationService);

      const res = await service.send(`Hello`, `Some message`, {
        fcmToken: 'someToken',
        fcmTokenType: FCMTokenType.Android
      }, {type: 'spot-taken', payload: '1'});
      expect(res).toEqual({
        canonicalRegistrationTokenCount: 1,
        failureCount: 0,
        multicastId: 0,
        results: [],
        successCount: 1,
      });
    });
  });
});
