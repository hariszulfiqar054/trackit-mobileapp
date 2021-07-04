import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import * as Work from '../../../shared/exporter';
import {
  SafeWrapper,
  BtnWrapper,
  CartCard,
  Btn,
  Textinput,
} from '../../../shared/components/index';
import Micon from 'react-native-vector-icons/MaterialIcons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { emptyCart } from '../../../store/actions/cart.action';

const {
  WP,
  THEME: { colors },
} = Work;
const ShopInfo = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const cart = useSelector((state) => state?.cart?.cartItems);
  const user = useSelector((state) => state?.auth?.user);

  const dispatch = useDispatch();

  const placeOrder = async (value) => {
    const isConnected = Work.checkInternetConnection();
    if (isConnected) {
      setLoading(true);
      try {
        const response = await axios.post('order/placeOrder', {
          item: cart,
          orderTakenBy: user?.data?._id,
          city: user?.data?.city,
          shopAddress: value?.shopAddress,
          shopOwnerContact: value?.shopContact,
          shopOwnerName: value?.shopOwnerName,
          shopName: value?.shopName,
        });
        if (response?.data) {
          dispatch(emptyCart());
          Work.showToast('Order Placed Successfully');
          navigation.navigate('orderSuccess');
        }
      } catch (error) {
        Work.showToast(
          error?.response?.data?.message ||
          error?.message ||
          Work.GENERAL_ERROR_MSG,
        );
      }
      setLoading(false);
    } else Work.showToast(Work.INTERNET_CONNECTION_ERROR);
  };

  return (
    <SafeWrapper>
      <KeyboardAwareScrollView>
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
            <Text style={styles.label}>Shop Information</Text>
          </View>
        </View>
        <Formik
          initialValues={{
            shopContact: '+92',
            shopOwnerName: '',
            shopName: '',
            shopAddress: '',
          }}
          validationSchema={Yup.object({
            shopContact: Yup.string().required('Required'),
            shopOwnerName: Yup.string().required('Required'),
            shopName: Yup.string().required('Required'),
            shopAddress: Yup.string().required('Required'),
          })}
          onSubmit={(values, formikActions) => {
            if (values.shopContact.length > 10) {
              Alert.alert(
                'Place Order',
                'Are you sure you want to place order?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  { text: 'OK', onPress: () => placeOrder(values) },
                ],
              );
            } else Work.showToast('Enter the valid contact');
          }}>
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            errors,
            touched,
            values,
          }) => (
            <View style={{ marginTop: WP('8') }}>
              <Textinput
                label="Shop Name"
                placeholder="Enter Shop Name..."
                onBlur={handleBlur('shopName')}
                onChangeText={handleChange('shopName')}
                value={values.shopName}
                isError={
                  errors.shopName && touched.shopName ? errors.shopName : null
                }
              />
              <Textinput
                label="Shop Contact"
                placeholder="Enter Shop Contact..."
                keyboardType="phone-pad"
                onBlur={handleBlur('shopContact')}
                onChangeText={handleChange('shopContact')}
                value={values.shopContact}
                isError={
                  errors.shopContact && touched.shopContact
                    ? errors.shopContact
                    : null
                }
              />
              <Textinput
                label="Shop Owner Name"
                placeholder="Enter Shop Owner Name..."
                onBlur={handleBlur('shopOwnerName')}
                onChangeText={handleChange('shopOwnerName')}
                value={values.shopOwnerName}
                isError={
                  errors.shopOwnerName && touched.shopOwnerName
                    ? errors.shopOwnerName
                    : null
                }
              />
              <Textinput
                label="Shop Address"
                placeholder="Enter Shop Address..."
                onBlur={handleBlur('shopAddress')}
                onChangeText={handleChange('shopAddress')}
                value={values.shopAddress}
                isError={
                  errors.shopAddress && touched.shopAddress
                    ? errors.shopAddress
                    : null
                }
              />
              <Btn
                label="Place Order"
                containerStyle={{ marginBottom: WP('5'), marginTop: WP('30') }}
                onPress={isLoading ? null : handleSubmit}
                isLoading={isLoading}
              />
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </SafeWrapper>
  );
};

export default ShopInfo;

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
