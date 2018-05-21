import {Test, TestingModule} from '@nestjs/testing';
import {PushNotificationService} from './push-notification.service';
import {FCMTokenType} from '../user/fcm-token-type.enum';
import {pushNotificationMockProvider} from './push-notification-sender.provider';

describe('PushNotificationService', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      components: [
        pushNotificationMockProvider,
        PushNotificationService
      ],
    }).compile();
  });

  describe('delivering Notifications', () => {
    it('should send', async () => {

      const service = app.get<PushNotificationService>(PushNotificationService);

      const res = await   service.send(`Hello`, `Some message`, {
        fcmToken: 'someToken',
        fcmTokenType: FCMTokenType.Android
      });
      expect(res).toBe(`I have no idea what the actual return is atm!`);
    });
  });
});
