import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Header,
  SafeWrapper,
  Textinput,
  StockCard,
} from '../../../shared/components';
import * as Work from '../../../shared/exporter';
import Aicon from 'react-native-vector-icons/AntDesign';

const {
  WP,
  THEME: {colors},
} = Work;
const Stock = ({navigation}) => {
  return (
    <SafeWrapper>
      <Header label="Stocks" drawer={navigation} />
      <Textinput
        placeholder="Search items ...."
        leftIcon={
          <Aicon
            name="search1"
            color={colors.grey}
            size={WP('6')}
            style={{marginStart: WP('3')}}
          />
        }
      />
      <StockCard
        price="240"
        qty="20"
        name="Brake Shoe"
        img="https://sribu-sg.s3.amazonaws.com/assets/media/contest_detail/2019/1/packaging-design-for-ms-brake-pads-amp-brake-shoes-5c3eaa219d68b12cbadadea6/fc41e00d64.jpg"
      />
    </SafeWrapper>
  );
};

export default Stock;

const styles = StyleSheet.create({});
