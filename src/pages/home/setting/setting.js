import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeWrapper, BtnWrapper, Header} from '../../../shared/components';
import Eicon from 'react-native-vector-icons/Entypo';
import Iicon from 'react-native-vector-icons/Ionicons';
import {WP} from '../../../shared/exporter';

const Setting = ({navigation}) => {
  return (
    <SafeWrapper>
      <Header label="Settings" drawer={navigation} />
      <BtnWrapper onPress={() => navigation.navigate('profile')}>
        <View style={styles.lineContainer}>
          <Iicon name="person" size={WP('5')} />
          <Text style={styles.txt}>Profile</Text>
        </View>
      </BtnWrapper>
      <BtnWrapper>
        <View style={styles.lineContainer}>
          <Eicon name="log-out" size={WP('5')} />
          <Text style={styles.txt}>Logout</Text>
        </View>
      </BtnWrapper>
    </SafeWrapper>
  );
};

export default Setting;

const styles = StyleSheet.create({
  lineContainer: {
    padding: WP('4'),
    flexDirection: 'row',
    alignItems: 'center',
  },

  txt: {
    fontSize: WP('4.5'),
    marginStart: WP('3'),
  },
  icon: {
    marginStart: WP('4'),
  },
});
