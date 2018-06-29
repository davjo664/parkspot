import config from '../../config/config';
import {Platform} from 'react-native';

export function updateUserSuccess(user: Object) {
  return {
    type: 'UPDATE_USER',
    user,
  };
}


export function createUser(fcmToken: String) {

  const url = config.api.url + 'user';
  console.log(url);
  const data = {
    fcmToken,
    fcmTokenType: Platform.ios ? 0 : 1,
  };
  console.log(JSON.stringify(data));
  return dispatch =>
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }) // Redux Thunk handles these
      .then(res => res.json())
      .then(data => {
        if (data.statusCode && data.statusCode !== 200) {
          console.log(data);
        } else {
          dispatch(updateUserSuccess(data));
        }
      });
}

export function updateUser(id: Number, fcmToken: String) {

  const url = config.api.url + 'user/' + id;
  const data = {
    fcmToken,
    fcmTokenType: Platform.ios ? 0 : 1,
  };
  return dispatch =>
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }) // Redux Thunk handles these
      .then(res => res.json())
      .then(data => {
        if (data.statusCode && data.statusCode !== 200) {
          console.log(data);
        } else {
          dispatch(updateUserSuccess(data));
        }
      });
}

export function subscribeToParkspot(id: Number, userId: Number) {
  const url = config.api.url + 'subscription/';
  const data = {
    parkSpotId: id,
    userId: userId,
  };
  return dispatch =>
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
      }
    }) // Redux Thunk handles these
      .then(res => res.json())
      .then(data => {
        if (data.statusCode && data.statusCode !== 201) {
          console.log(data);
        } else {
          console.log(data);
        }
      }).catch((err) => {
        console.warn(err);

      });
}

export function deletedSubscription() {
  return {type: 'DELETED_SUBSCRIPTION'};
}

export function deleteubscriptionWithId(id: Number) {
  const url = config.api.url + 'subscription/' + id;
  return dispatch =>
    fetch(url, {
      method: 'DELETE'
    }) // Redux Thunk handles these
      .then(res => res.json())
      .then(data => {
        if (data.statusCode && data.statusCode !== 200) {
          console.log(data);
        } else {
          dispatch(deletedSubscription());
        }
      }).catch((err) => {
        console.warn(err);
      });
}

export function deleteUsersSubscriptions(userId: Number) {
  const url = config.api.url + 'subscription?user=' + userId;
  return dispatch => fetch(url).then(res => res.json()).then(data => {
    if (data.statusCode && data.statusCode !== 200) {
      console.log(data);
    } else {
      for (const subscription of data) {
        dispatch(deleteubscriptionWithId(subscription.id));
      }

    }
  }).catch((err) => {
    console.warn(err);

  });
}



