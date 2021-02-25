import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Work from '../exporter';
import {BtnWrapper} from './';
import moment from 'moment';

const {
  WP,
  THEME: {colors},
} = Work;
const OrderCard = ({onPress, orderId, shop, date, amount, status}) => {
  return (
    <BtnWrapper>
      <View style={styles.container}>
        <View style={styles.statusContainer}>
          <Text style={styles.order}>Status:</Text>
          <Text
            style={{
              color:
                status == 'pending'
                  ? '#da723c'
                  : status == 'completed'
                  ? '#00af91'
                  : '#fa1e0e',
            }}>
            {status}
          </Text>
        </View>
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
            <Text style={{fontWeight: 'bold'}}>Items : </Text>
            <Text>{amount}</Text>
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
    position: 'relative',
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
  statusContainer: {
    position: 'absolute',
    right: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
