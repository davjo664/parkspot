import {FCMTokenType} from '../modules/user/fcm-token-type.enum';

export interface PushTarget {
  fcmToken: string;
  fcmTokenType: FCMTokenType;
}
