import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Work from '../exporter';
import {BtnWrapper} from './';
import moment from 'moment';

const {
  WP,
  THEME: {colors},
} = Work;
const OrderCard = ({onPress, orderId, shop, date, amount}) => {
  return (
    <BtnWrapper>
      <View style={styles.container}>
        <Text style={styles.order}>
          <Text style={{fontWeight: 'bold'}}>Order No.</Text>
          <Text>{orderId}</Text>
        </Text>

        <Text style={[styles.order, {fontSize: WP('4')}]}>
          <Text style={{fontWeight: 'bold'}}>Shop : </Text>
          <Text>{shop}</Text>
        </Text>
        <View style={styles.row}>
          <Text style={styles.order}>
            <Text style={{fontWeight: 'bold'}}>Dated : </Text>
            <Text>{moment(date).format('DD-MM-YYYY')}</Text>
          </Text>
          <Text style={styles.order}>
            <Text style={{fontWeight: 'bold'}}>Amount : </Text>
            <Text>{amount?.toFixed(2)}</Text>
          </Text>
        </View>
      </View>
    </BtnWrapper>
  );
};

export default React.memo(OrderCard);

const styles = StyleSheet.create({
  container: {
    width: '85%',
    borderWidth: 1,
    borderColor: colors.lightGrey,
    alignSelf: 'center',
    borderRadius: 7,
    marginTop: WP('4'),
  },
  order: {
    color: colors.grey,
    padding: WP('2'),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
