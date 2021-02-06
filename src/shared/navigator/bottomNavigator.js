import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Announcement, Chat, Setting, Order} from '../../pages/index';
import * as Work from '../exporter';
import Eicon from 'react-native-vector-icons/Entypo';
import Mcicon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ficon from 'react-native-vector-icons/Fontisto';

const Tab = createBottomTabNavigator();
const {
  WP,
  THEME: {colors},
} = Work;
const BottomNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarIcon: ({focused}) => (
            <Ficon
              name="player-settings"
              size={WP('5')}
              color={focused ? colors.primary : colors.lightGrey}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={[
                styles.txt,
                {color: focused ? colors.primary : colors.lightGrey},
              ]}>
              Setting
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={Order}
        options={{
          tabBarIcon: ({focused}) => (
            <Mcicon
              name="clipboard-list"
              size={WP('5')}
              color={focused ? colors.primary : colors.lightGrey}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={[
                styles.txt,
                {color: focused ? colors.primary : colors.lightGrey},
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
          tabBarIcon: ({focused}) => (
            <Eicon
              name="chat"
              size={WP('5')}
              color={focused ? colors.primary : colors.lightGrey}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={[
                styles.txt,
                {color: focused ? colors.primary : colors.lightGrey},
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
          tabBarIcon: ({focused}) => (
            <Eicon
              name="modern-mic"
              size={WP('5')}
              color={focused ? colors.primary : colors.lightGrey}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={[
                styles.txt,
                {color: focused ? colors.primary : colors.lightGrey},
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
