import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Eicon from 'react-native-vector-icons/Entypo';
import {BtnWrapper} from './';
import * as Work from '../exporter';

const {
  WP,
  THEME: {colors},
} = Work;
const QtyBtn = ({onPressMinus, onPressPlus, qty}) => {
  return (
    <View style={styles.container}>
      <BtnWrapper onPress={onPressMinus}>
        <View style={{backgroundColor: colors.primary, borderRadius: 100}}>
          <Eicon
            name="minus"
            color={colors.white}
            size={WP('5')}
            style={{padding: WP('0.5')}}
          />
        </View>
      </BtnWrapper>
      <Text style={styles.qty}>{qty}</Text>
      <BtnWrapper onPress={onPressPlus}>
        <View style={{backgroundColor: colors.primary, borderRadius: 100}}>
          <Eicon
            name="plus"
            color={colors.white}
            size={WP('5')}
            style={{padding: WP('0.5')}}
          />
        </View>
      </BtnWrapper>
    </View>
  );
};

export default QtyBtn;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qty: {
    fontSize: WP('4'),
    color: colors.grey,
    paddingHorizontal: WP('2'),
  },
});
