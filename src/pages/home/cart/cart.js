import React, {useMemo} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import * as Work from '../../../shared/exporter';
import {
  SafeWrapper,
  BtnWrapper,
  CartCard,
  Btn,
} from '../../../shared/components/index';
import Micon from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import {itemDec, itemInc, itemRemove} from '../../../store/actions/cart.action';

const {
  WP,
  THEME: {colors},
} = Work;
const Cart = ({navigation}) => {
  const cart = useSelector((state) => state?.cart?.cartItems);
  const [total, setTotal] = React.useState(0);

  const totalPrice = useMemo(() => {
    let total = 0;
    for (let i = 0; i < cart?.length; i++) {
      total = (cart[i].orderQty || 1) * cart[i].price + total;
    }
    setTotal(total);
  }, [cart]);

  const dispatch = useDispatch();

  return (
    <SafeWrapper>
      <View style={styles.header}>
        <BtnWrapper onPress={() => navigation.goBack()}>
          <View style={styles.btnWrapper}>
            <Micon
              style={{padding: WP('0.6')}}
              name="keyboard-arrow-left"
              size={WP('9')}
              color={colors.white}
            />
          </View>
        </BtnWrapper>
        <View style={{flex: 0.8, alignItems: 'center'}}>
          <Text style={styles.label}>Cart</Text>
        </View>
      </View>
      {cart?.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: WP('5')}}>
            No Item In Cart Right Now!
          </Text>
        </View>
      ) : (
        <>
          <View style={{height: Work.HP('65'), marginTop: WP('2')}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={cart}
              renderItem={({item, index}) => (
                <CartCard
                  name={item?.item_name}
                  price={item?.price}
                  img={item?.img}
                  qty={item?.orderQty || 1}
                  onPressRemove={() => {
                    dispatch(itemRemove(item?._id));
                    Work.showToast('Item Successfully Removed');
                  }}
                  onPressInc={() => {
                    if (item?.orderQty >= item?.quantity) {
                      Work.showToast('Limited Stock');
                    } else dispatch(itemInc(index));
                  }}
                  onPressDec={() => dispatch(itemDec(index))}
                />
              )}
              keyExtractor={(item) => item?._id}
            />
          </View>
          <View>
            <Text style={[styles.label, {paddingStart: WP('4')}]}>
              Order Info
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={[
                  styles.label,
                  {
                    paddingStart: WP('4'),
                    paddingTop: WP('4'),
                    fontWeight: 'bold',
                  },
                ]}>
                Total :
              </Text>
              <Text
                style={[
                  styles.label,
                  {paddingStart: WP('1'), paddingTop: WP('4')},
                ]}>
                {total}
              </Text>
            </View>
            <Btn
              onPress={() => navigation.navigate('shopInfo')}
              label="Proceed to Checkout"
              containerStyle={{marginTop: WP('7'), marginBottom: WP('5')}}
            />
          </View>
        </>
      )}
    </SafeWrapper>
  );
};

export default Cart;

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
