import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import Routes from './src/routes/routes';
import {Provider} from 'react-redux';
import {STORE, PERSISTOR} from './src/store/store.config';
import {PersistGate} from 'redux-persist/integration/react';
import OneSignal from 'react-native-onesignal';

const App = () => {
  useEffect(() => {
    OneSignal.setAppId('3969450a-1cda-4fb6-96ee-426d2f8fe947');
    OneSignal.setLogLevel(6, 0);
    OneSignal.setRequiresUserPrivacyConsent(false);

    /* O N E S I G N A L  H A N D L E R S */
    OneSignal.setNotificationWillShowInForegroundHandler(
      (notifReceivedEvent) => {
        // this.OSLog("OneSignal: notification will show in foreground:", notifReceivedEvent);
        let notif = notifReceivedEvent.getNotification();

        const button1 = {
          text: 'Cancel',
          onPress: () => {
            notifReceivedEvent.complete();
          },
          style: 'cancel',
        };

        const button2 = {
          text: 'Complete',
          onPress: () => {
            notifReceivedEvent.complete(notif);
          },
        };

        // Alert.alert('Complete notification?', 'Test', [button1, button2], {
        //   cancelable: true,
        // });
      },
    );
    OneSignal.setNotificationOpenedHandler((notification) => {
      // this.OSLog("OneSignal: notification opened:", notification);
    });
    OneSignal.setInAppMessageClickHandler((event) => {
      // this.OSLog("OneSignal IAM clicked:", event);
    });
    OneSignal.addEmailSubscriptionObserver((event) => {
      // this.OSLog("OneSignal: email subscription changed: ", event);
    });
    OneSignal.addSubscriptionObserver((event) => {
      // this.OSLog("OneSignal: subscription changed:", event);
      // this.setState({ isSubscribed: event.to.isSubscribed})
    });
    OneSignal.addPermissionObserver((event) => {
      // this.OSLog("OneSignal: permission changed:", event);
    });

    // const deviceState = await OneSignal.getDeviceState();
  }, []);
  return (
    <Provider store={STORE}>
      <PersistGate persistor={PERSISTOR}>
        <Routes></Routes>
      </PersistGate>
    </Provider>
  );
};

export default App;
