import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header, SafeWrapper} from '../../../shared/components';

const Stock = ({navigation}) => {
  return (
    <SafeWrapper>
      <Header label="Stocks" drawer={navigation} />
    </SafeWrapper>
  );
};

export default Stock;

const styles = StyleSheet.create({});
