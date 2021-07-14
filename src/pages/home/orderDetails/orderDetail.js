import React, { useMemo } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import * as Work from '../../../shared/exporter';
import {
  SafeWrapper,
  Header,
  StockCard,
  BtnWrapper,
} from '../../../shared/components/';
import Micon from 'react-native-vector-icons/MaterialIcons';

const {
  WP,
  THEME: { colors },
} = Work;
const OrderDetail = ({ navigation, route }) => {
  const totalCost = useMemo(() => {
    let total = 0;
    for (let i = 0; i < route?.params?.item?.items?.length; i++) {
      total =
        total +
        Number(route?.params?.item?.items[i]?.price) *
          Number(route?.params?.item?.items[i]?.orderQty);
    }
    return total;
  }, []);
  return (
    <SafeWrapper>
      <ScrollView style={{ flexGrow: 1 }}>
        <View style={styles.header}>
          <BtnWrapper onPress={() => navigation.goBack()}>
            <View style={styles.btnWrapper}>
              <Micon
                style={{ padding: WP('0.6') }}
                name="keyboard-arrow-left"
                size={WP('9')}
                color={colors.white}
              />
            </View>
          </BtnWrapper>
          <View style={{ flex: 0.8, alignItems: 'center' }}>
            <Text style={styles.label}>Order Details</Text>
          </View>
        </View>
        {route?.params?.item?.items?.map((data) => (
          <StockCard
            key={data?._id}
            img={data?.img}
            price={data?.price}
            name={data?.item_name}
            qty={data?.orderQty}
          />
        ))}
        <View style={{ marginLeft: WP(7), marginTop: WP(5) }}>
          <Text style={{ fontWeight: 'bold', fontSize: WP('4') }}>
            Total Amount : {totalCost}
          </Text>
        </View>
      </ScrollView>
    </SafeWrapper>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  label: {
    fontSize: WP('5'),
    color: colors.grey,
    letterSpacing: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: WP('2.5'),
  },
  btnWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    marginStart: WP('3'),
  },
});
