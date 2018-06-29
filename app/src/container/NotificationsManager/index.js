import * as React from 'react';

import firebase, {Notification} from 'react-native-firebase';
import {connect} from 'react-redux';
import {View, Text, TouchableOpacity} from 'react-native';
import {createUser, updateUser, subscribeToParkspot, deleteUsersSubscriptions} from './actions';
import {PermissionHelper} from '../../helper/PermissionHelper';



export interface Props {
  navigation: any;
}


class NotificationsManager extends React.Component<Props, State> {

  updateOrCreateUser(token: String) {

    if (this.props.user.id === undefined) {
      console.log('create user');
      this.props.createUser(token);

    } else {
      if (this.props.user.fcmToken !== token) {
        console.log('update user');
        this.props.updateUser(this.props.user.id, token);
      }

    }
  }

  handleNotifications() {
    firebase.messaging().getToken()
      .then(fcmToken => {
        if (fcmToken) {
          // user has a device token
          console.log(fcmToken);
          this.updateOrCreateUser(fcmToken);

        } else {
          // should always have a token as it gets requested before
          // user doesn't have a device token yet
        }
      });
    //when a particular notification has been displayed
    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
      // Process your notification as required
      // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
      console.log('onNotificationDisplayed');
      console.log(notification);

    });

    // when a particular notification has been received in foreground
    this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
      console.log('onNotification');
      console.log(notification);
    });


    // notification clicked when app is in foreground or background mode
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action;
      // Get information about the notification that was opened
      const notification: Notification = notificationOpen.notification;
      console.log('onNotificationOpened in fore or background');
      console.log(notification);
    });
  }

  componentDidMount() {
    //check if app was opened via notification when App was closed
    firebase.notifications().getInitialNotification().then((notificationOpen: NotificationOpen) => {
      if (notificationOpen) {
        // App was opened by a notification
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification: Notification = notificationOpen.notification;
        console.log('onNotificationOpened when closed');
        console.log(notificationOpen);

      }
    });

    // check for Permisson and request if not there
    PermissionHelper.hasPermission('notification', () => {
      this.handleNotifications();
    }, true);
  }

  componentWillUnmount() {
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
  }

  render() {
    return (<View style={{height: 100}}><View style={{marginTop: 50}}><TouchableOpacity onPress={() => {this.props.createSubscription(1, 232)}} ><Text>Subscribe</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => {this.props.deleteUsersSubscriptions(232)}}><Text>Delete</Text></TouchableOpacity></View></View >);
  }
}

function bindAction(dispatch) {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    createUser: (user) => dispatch(createUser(user)),
    createSubscription: (id, userId) => dispatch(subscribeToParkspot(id, userId)),
    deleteUsersSubscriptions: (userId) => dispatch(deleteUsersSubscriptions(userId)),

  };
}

const mapStateToProps = state => ({
  user: state.notificationsReducer.user
});
export default connect(mapStateToProps, bindAction)(NotificationsManager);
