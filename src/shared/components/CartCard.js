import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import * as Work from '../exporter';
import {BtnWrapper, QtyBtn} from '.';
import Eicon from 'react-native-vector-icons/EvilIcons';

const {
  WP,
  THEME: {colors},
} = Work;
const CartCard = ({
  img,
  price,
  qty,
  name,
  onPressRemove,
  onPressInc,
  onPressDec,
}) => {
  return (
    <View style={styles.conatiner}>
      <Image style={styles.img} source={{uri: img}} />
      <View style={{marginStart: WP('2')}}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>Rs. {price}</Text>
      </View>
      <View style={styles.qtyBtnWrapper}>
        <QtyBtn qty={qty} onPressMinus={onPressDec} onPressPlus={onPressInc} />
      </View>
      <BtnWrapper onPress={onPressRemove}>
        <View style={styles.removeBtnContainer}>
          <Text
            style={{fontSize: WP('3'), color: colors.white, padding: WP('1')}}>
            Remove
          </Text>
        </View>
      </BtnWrapper>
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  conatiner: {
    borderWidth: 1,
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 7,
    borderColor: colors.lightGrey,
    position: 'relative',
  },
  img: {
    width: WP('23'),
    height: WP('23'),
    resizeMode: 'contain',
    margin: WP('1'),
  },
  name: {
    fontSize: WP('4'),
    fontWeight: 'bold',
    color: colors.black,
    letterSpacing: 0.5,
    padding: WP('1'),
    opacity: 0.8,
  },
  price: {
    fontSize: WP('3.8'),
    color: colors.black,
    padding: WP('1'),
    opacity: 0.8,
  },
  qtyBtnWrapper: {
    position: 'absolute',
    bottom: '12%',
    right: '7%',
  },
  removeBtnContainer: {
    backgroundColor: '#CC8241',
    borderRadius: 100,
    position: 'absolute',
    right: '6%',
    top: '8%',
  },
});
