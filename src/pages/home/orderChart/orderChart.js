import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { SkypeIndicator } from 'react-native-indicators';
import { PieChart } from 'react-native-chart-kit';
import { useSelector } from 'react-redux';
import { Header, SafeWrapper } from '../../../shared/components';
import * as Work from '../../../shared/exporter';

const OrderChart = ({ navigation }) => {
  const user = useSelector((state) => state.auth?.user);
  const [isLoading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    getOrderData();
  }, []);

  const getOrderData = async () => {
    setLoading(true);
    try {
      const response = await axios.post('order/orderCount', {
        id: user?.data?._id,
      });
      if (response.data) {
        setOrderData(response?.data?.data);
      }
    } catch (error) {
      alert(error?.response?.data?.message || error?.message);
    }
    setLoading(false);
  };

  const data = React.useMemo(() => {
    return [
      {
        name: 'Total',
        population:
          Number(orderData?.pendingOrders) ||
          0 + Number(orderData?.cancelledOrders) ||
          0 + Number(orderData?.completeOrders) ||
          0 + Number(orderData?.acceptedOrders) ||
          0,
        color: Work.THEME.colors.primary,
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Pending',
        population: Number(orderData?.pendingOrders) || 0,
        color: '#ECD662',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Accepted',
        population: Number(orderData?.acceptedOrders) || 0,
        color: '#66DE93',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Completed',
        population: Number(orderData?.completeOrders) || 0,
        color: '#4AA96C',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Cancelled',
        population: Number(orderData?.cancelledOrders) || 0,
        color: 'red',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
    ];
  }, [orderData]);

  return (
    <SafeWrapper>
      <Header label="Orders Chart" drawer={navigation} />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {isLoading ? (
          <SkypeIndicator color={Work.THEME.colors.primary} />
        ) : (
          <PieChart
            data={data}
            width={Work.WP('100')}
            height={Work.WP('60')}
            chartConfig={{
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            accessor={'population'}
            backgroundColor={'transparent'}
            paddingLeft={'15'}
            absolute
          />
        )}
      </View>
    </SafeWrapper>
  );
};

export default OrderChart;

const styles = StyleSheet.create({});
