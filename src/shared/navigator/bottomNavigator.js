import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, PermissionsAndroid } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Announcement, Chat, Order, Stock } from '../../pages/index';
import * as Work from '../exporter';
import Eicon from 'react-native-vector-icons/Entypo';
import Mcicon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ficon from 'react-native-vector-icons/Fontisto';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geolocation from 'react-native-geolocation-service';
import io from 'socket.io-client';
import Env from '../../env/env';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();
const {
  WP,
  THEME: { colors },
} = Work;
const socket = io(Env.SOCKET_URL);
const BottomNavigator = () => {
  const user = useSelector((state) => state?.auth?.user);
  const watcherId = useRef(null);

  useEffect(() => {
    if (socket) {
      socket.emit('locationSocket', user?.data?.city);
    }

    getLocationPermission();

    return () => {
      Geolocation.clearWatch(watcherId.current);
      if (socket) return socket.emit('leaveRoom', user?.data?.city);
    };
  }, []);

  const enableLocation = () => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 3000,
      fastInterval: 5000,
    })
      .then((data) => {
        setTimeout(() => {
          Geolocation.getCurrentPosition((info) => {});
        }, 10000);
        watchPostions();
      })
      .catch((err) => {});
  };

  const watchPostions = () => {
    try {
      watcherId.current = Geolocation.watchPosition(
        (position) => {
          if (socket) {
            socket.emit('locationChange', {
              id: user?.data?._id,
              room: user?.data?.city,
              name: user?.data?.name,
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              area: user?.data?.area,
            });
          }
        },
        (err) => {},
        { enableHighAccuracy: true, interval: 5000 },
      );
    } catch (error) {}
  };

  const getLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Trackit App',
          message: 'TrackIt App wants to access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        enableLocation();
      } else {
        enableLocation();
        console.log('location permission denied');
        alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <Tab.Navigator initialRouteName="Announcement">
      <Tab.Screen
        name="Stock"
        component={Stock}
        options={{
          tabBarIcon: ({ focused }) => (
            <Eicon
              name="list"
              size={WP('5')}
              color={focused ? colors.primary : colors.lightGrey}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.txt,
                { color: focused ? colors.primary : colors.lightGrey },
              ]}>
              Stock
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={Order}
        options={{
          tabBarIcon: ({ focused }) => (
            <Mcicon
              name="clipboard-list"
              size={WP('5')}
              color={focused ? colors.primary : colors.lightGrey}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.txt,
                { color: focused ? colors.primary : colors.lightGrey },
              ]}>
              Order
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ focused }) => (
            <Eicon
              name="chat"
              size={WP('5')}
              color={focused ? colors.primary : colors.lightGrey}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.txt,
                { color: focused ? colors.primary : colors.lightGrey },
              ]}>
              Chat
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Announcement"
        component={Announcement}
        options={{
          tabBarIcon: ({ focused }) => (
            <Eicon
              name="modern-mic"
              size={WP('5')}
              color={focused ? colors.primary : colors.lightGrey}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.txt,
                { color: focused ? colors.primary : colors.lightGrey },
              ]}>
              Announcement
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({
  txt: {
    fontSize: WP('3'),
    paddingBottom: WP('1'),
  },
});
