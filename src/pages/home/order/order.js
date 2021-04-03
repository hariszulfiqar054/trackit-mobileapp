import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {Header, SafeWrapper, OrderCard, Btn} from '../../../shared/components';
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
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getOrderList();
  }, []);

  const onRefresh = () => {
    setOrderList([]);
    setPage(1);
    getOrderList();
  };

  const getOrderList = async () => {
    const isConnected = await Work.checkInternetConnection();
    if (isConnected) {
      setLoading(true);
      try {
        const response = await axios.get(`order/orderBySaleman?page=${page}`);
        if (response?.data) {
          if (page == 1) {
            setOrderList(response?.data?.data);
            setTotalPages(response?.data?.total_pages);
          } else {
            setOrderList([...orderList, ...response?.data?.data]);
            setTotalPages(response?.data?.total_pages);
          }
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
        <>
          <FlatList
            onRefresh={onRefresh}
            refreshing={isLoading}
            data={orderList}
            renderItem={({item}) => (
              <OrderCard
                date={item?.createdAt}
                amount={item?.items?.length}
                shop={item?.shopName || 'NO Shop Name'}
                orderId={item?._id?.substring(0, 10)}
                status={item?.status}
                onPress={() => navigation.navigate('orderDetail', {item})}
              />
            )}
            keyExtractor={(item) => item?._id}
          />
          {totalPages > page ? (
            <Btn
              label="Load More"
              containerStyle={styles.btnContainer}
              labelStyle={{fontSize: WP('3.7'), padding: WP('1')}}
              onPress={() => setPage((pre) => pre + 1)}
            />
          ) : null}
        </>
      )}
    </SafeWrapper>
  );
};

export default Order;

const styles = StyleSheet.create({});
