import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import * as Work from '../exporter';
import {BtnWrapper} from './';

const {
  WP,
  THEME: {colors},
} = Work;
const StockCard = ({img, price, qty, onPress, name}) => {
  return (
    <View style={styles.conatiner}>
      <Image style={styles.img} source={{uri: img}} />
      <View>
        <Text>{name}</Text>
        <Text>{price}</Text>
        <Text>Qty: {qty}</Text>
      </View>
    </View>
  );
};

export default StockCard;

const styles = StyleSheet.create({
  conatiner: {
    borderWidth: 1,
    flexDirection: 'row',
  },
  img: {
    width: WP('23'),
    height: WP('23'),
    resizeMode: 'contain',
  },
});
