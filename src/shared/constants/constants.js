import React from 'react';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-tiny-toast';

export const GENERAL_ERROR_MSG = 'Technical error, Please contact support.';
export const INTERNET_CONNECTION_ERROR =
  'Please check your internet connection and try again.';

export const showToast = (msg) => {
  Toast.show(msg, {
    containerStyle: {width: '80%'},
  });
};

export const checkInternetConnection = () => {
  return new Promise(async (resolve, reject) => {
    var internet = await NetInfo.fetch();
    resolve(internet.isConnected);
  });
};

export const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
