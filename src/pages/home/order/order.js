import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header, SafeWrapper, OrderCard} from '../../../shared/components';

const Order = ({navigation}) => {
  return (
    <SafeWrapper>
      <Header label="Orders" drawer={navigation} />
      <OrderCard
        date={Date.now()}
        amount={240}
        shop="Gulberg 3 lahore gurumanagt road"
        orderId="123456"
      />
      <OrderCard
        date={Date.now()}
        amount={240}
        shop="Gulberg 3 lahore gurumanagt road"
        orderId="123456"
      />
      <OrderCard
        date={Date.now()}
        amount={240}
        shop="Gulberg 3 lahore gurumanagt road"
        orderId="123456"
      />
      <OrderCard
        date={Date.now()}
        amount={240}
        shop="Gulberg 3 lahore gurumanagt road"
        orderId="123456"
      />
    </SafeWrapper>
  );
};

export default Order;

const styles = StyleSheet.create({});
