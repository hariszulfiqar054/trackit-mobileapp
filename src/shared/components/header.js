import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Eicon from 'react-native-vector-icons/Entypo';
import * as Work from '../exporter';
import {BtnWrapper} from './';
import {useNavigation} from '@react-navigation/native';

const {
  WP,
  THEME: {colors},
} = Work;
const Header = ({label, drawer}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <BtnWrapper onPress={() => drawer.toggleDrawer()}>
        <Eicon name="menu" size={WP('9')} color={colors.primary} />
      </BtnWrapper>
      <Text style={styles.label}>{label}</Text>
      <BtnWrapper onPress={() => navigation.navigate('cart')}>
        <View style={{backgroundColor: colors.primary, borderRadius: 100}}>
          <Eicon
            name="shopping-cart"
            color={colors.white}
            size={WP('5')}
            style={{padding: WP('2.5')}}
          />
        </View>
      </BtnWrapper>
    </View>
  );
};

export default React.memo(Header);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: WP('4'),
  },
  label: {
    fontSize: WP('5'),
    color: colors.grey,
    letterSpacing: 1,
  },
});
