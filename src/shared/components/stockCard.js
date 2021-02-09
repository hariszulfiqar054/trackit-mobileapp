import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import * as Work from '../exporter';
import {BtnWrapper} from './';
import Eicon from 'react-native-vector-icons/EvilIcons';

const {
  WP,
  THEME: {colors},
} = Work;
const StockCard = ({img, price, qty, onPress, name}) => {
  return (
    <View style={styles.conatiner}>
      <Image style={styles.img} source={{uri: img}} />
      <View style={{marginStart: WP('2')}}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>Rs. {price}</Text>
        <Text style={styles.price}>Qty: {qty}</Text>
      </View>
      <BtnWrapper onPress={onPress}>
        <View style={styles.btnContainer}>
          <Eicon name="cart" color={colors.white} size={WP('5')} />
          <Text
            style={{
              color: colors.white,
              fontSize: WP('3.8'),
            }}>
            Add to cart
          </Text>
        </View>
      </BtnWrapper>
    </View>
  );
};

export default StockCard;

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
  btnContainer: {
    backgroundColor: '#CC8241',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 5,
    height: 28,
    width: WP('28'),
    justifyContent: 'center',
    right: '2%',
    bottom: '10%',
  },
});
