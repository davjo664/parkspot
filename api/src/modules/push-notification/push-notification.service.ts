import {Component} from '@nestjs/common';
import {PushTarget} from '../../utils/push-target.interface';
import * as admin from 'firebase-admin';
import {PushNotificationSender} from './push-notification-sender.provider';

@Component()
export class PushNotificationService {


  constructor(private pushNotificationSender: PushNotificationSender) {
  }


  // todo Can Kattwinkel: Determine return value of firebase.send
  async send(title: string, message: string, target: PushTarget): Promise<string> {
    const fcmMsg: admin.messaging.Message = {
      notification: {
        body: message,
        title
      },
      token: target.fcmToken
    };
    return await this.pushNotificationSender.send(fcmMsg, true);
  }

}
