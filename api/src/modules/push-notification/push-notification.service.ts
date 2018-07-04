import {Component} from '@nestjs/common';
import {PushTarget} from '../../utils/push-target.interface';
import * as admin from 'firebase-admin';
import {PushNotificationSender} from './push-notification-sender.provider';

@Component()
export class PushNotificationService {


  constructor(private pushNotificationSender: PushNotificationSender) {
  }

  async send(title: string, message: string, target: PushTarget, data: { [key: string]: string }): Promise<admin.messaging.MessagingDevicesResponse> {
    return await this.pushNotificationSender.send(title,message, target.fcmToken, data);
  }

}
