import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Work from '../../../shared/exporter';
import {
  SafeWrapper,
  BtnWrapper,
  CartCard,
  Btn,
} from '../../../shared/components/index';
import Micon from 'react-native-vector-icons/MaterialIcons';

const {
  WP,
  THEME: {colors},
} = Work;
const Cart = ({navigation}) => {
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
          <Text style={styles.label}>Cart</Text>
        </View>
      </View>
      <View style={{height: '70%'}}>
        <CartCard name="Brake Shoe" price="120" qty={2} />
      </View>
      <View>
        <Text style={[styles.label, {paddingStart: WP('4')}]}>Order Info</Text>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.label,
              {paddingStart: WP('4'), paddingTop: WP('4'), fontWeight: 'bold'},
            ]}>
            Total :
          </Text>
          <Text
            style={[
              styles.label,
              {paddingStart: WP('1'), paddingTop: WP('4')},
            ]}>
            20000
          </Text>
        </View>
        <Btn
          label="Proceed to Checkout"
          containerStyle={{marginTop: WP('7'), marginBottom: WP('5')}}
        />
      </View>
    </SafeWrapper>
  );
};

export default Cart;

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
