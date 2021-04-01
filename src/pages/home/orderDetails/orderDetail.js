import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Work from '../../../shared/exporter';
import {SafeWrapper, Header, BtnWrapper} from '../../../shared/components/';
import Micon from 'react-native-vector-icons/MaterialIcons';

const {
  WP,
  THEME: {colors},
} = Work;
const OrderDetail = ({navigation}) => {
  return (
    <SafeWrapper>
      <View style={styles.header}>
        <BtnWrapper onPress={() => navigation.goBack()}>
          <View style={styles.btnWrapper}>
            <Micon
              style={{padding: WP('0.6')}}
              name="keyboard-arrow-left"
              size={WP('9')}
              color={colors.white}
            />
          </View>
        </BtnWrapper>
        <View style={{flex: 0.8, alignItems: 'center'}}>
          <Text style={styles.label}>Order Details</Text>
        </View>
      </View>
    </SafeWrapper>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  label: {
    fontSize: WP('5'),
    color: colors.grey,
    letterSpacing: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: WP('2.5'),
  },
  btnWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    marginStart: WP('3'),
  },
});
