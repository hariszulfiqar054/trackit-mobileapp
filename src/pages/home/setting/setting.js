import React from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {SafeWrapper, BtnWrapper, Header} from '../../../shared/components';
import Eicon from 'react-native-vector-icons/Entypo';
import Iicon from 'react-native-vector-icons/Ionicons';
import {WP} from '../../../shared/exporter';
import {useDispatch} from 'react-redux';
import * as AuthJobs from '../../../store/actions/auth.action';

const Setting = ({navigation}) => {
  const dispatch = useDispatch();

  const onLogout = React.useCallback(() => {
    Alert.alert(
      'Logout User',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => dispatch(AuthJobs.saveUser(null))},
      ],
      {cancelable: true},
    );
  }, []);

  return (
    <SafeWrapper>
      <Header label="Settings" drawer={navigation} />
      <BtnWrapper onPress={() => navigation.navigate('profile')}>
        <View style={styles.lineContainer}>
          <Iicon name="person" size={WP('5')} />
          <Text style={styles.txt}>Profile</Text>
        </View>
      </BtnWrapper>
      <BtnWrapper onPress={onLogout}>
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
