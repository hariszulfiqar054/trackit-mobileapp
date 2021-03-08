import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {Header, SafeWrapper, OrderCard} from '../../../shared/components';
import * as Work from '../../../shared/exporter';
import axios from 'axios';
import {SkypeIndicator} from 'react-native-indicators';

const {
  WP,
  THEME: {colors},
} = Work;
const Order = ({navigation}) => {
  const [orderList, setOrderList] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getOrderList();
  }, []);

  const getOrderList = async () => {
    const isConnected = await Work.checkInternetConnection();
    if (isConnected) {
      setLoading(true);
      try {
        const response = await axios.get(`order/orderBySaleman?page=${page}`);
        if (response?.data) {
          setOrderList(response?.data?.data);
        }
      } catch (error) {
        Work.showToast(
          error?.response?.data?.message ||
            error?.response?.data?.data ||
            Work.GENERAL_ERROR_MSG,
        );
      }
      setLoading(false);
    } else Work.showToast(Work.INTERNET_CONNECTION_ERROR);
  };
  return (
    <SafeWrapper>
      <Header label="Orders" drawer={navigation} />
      {isLoading ? (
        <SkypeIndicator color={colors.primary} />
      ) : (
        <FlatList
          data={orderList}
          renderItem={({item}) => (
            <OrderCard
              date={item?.createdAt}
              amount={item?.items?.length}
              shop="Gulberg 3 lahore gurumanagt road"
              orderId={item?._id?.substring(0, 10)}
              status={item?.status}
            />
          )}
          keyExtractor={(item) => item?._id}
        />
      )}
    </SafeWrapper>
  );
};

export default Order;

const styles = StyleSheet.create({});
