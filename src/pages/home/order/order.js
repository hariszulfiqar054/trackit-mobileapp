import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header, SafeWrapper} from '../../../shared/components';

const Order = ({navigation}) => {
  return (
    <SafeWrapper>
      <Header label="Orders" drawer={navigation} />
    </SafeWrapper>
  );
};

export default Order;

const styles = StyleSheet.create({});
