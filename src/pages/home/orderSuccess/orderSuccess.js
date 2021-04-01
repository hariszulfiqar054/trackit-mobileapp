import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Work from '../../../shared/exporter';
import {SafeWrapper} from '../../../shared/components/';
import Aicon from 'react-native-vector-icons/AntDesign';

const {
  WP,
  THEME: {colors},
} = Work;
const OrderSuccess = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'dashboard'}],
      });
    }, 3000);
  }, []);
  return (
    <SafeWrapper style={{backgroundColor: colors.primary}}>
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Aicon name="checkcircle" color={colors.white} size={WP('20')} />
        <Text
          style={{
            fontSize: WP('5'),
            fontWeight: 'bold',
            color: colors.white,
            paddingTop: WP('4'),
          }}>
          Order Successfully Placed
        </Text>
      </View>
    </SafeWrapper>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({});
