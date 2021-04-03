import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {
  Header,
  SafeWrapper,
  Textinput,
  StockCard,
  Btn,
} from '../../../shared/components';
import * as Work from '../../../shared/exporter';
import Aicon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {SkypeIndicator} from 'react-native-indicators';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../../../store/actions/cart.action';

const {
  WP,
  THEME: {colors},
} = Work;
const Stock = ({navigation}) => {
  const cart = useSelector((state) => state?.cart?.cartItems);

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [stocks, setStocks] = useState([]);

  const [filteredStock, setFilterdStock] = useState([]);

  useEffect(() => {
    getStocks();
  }, [page]);

  const onRefresh = () => {
    setStocks([]);
    setPage(1);
    getStocks();
  };

  const onSearch = (search) => {
    if (search.length === 0) {
      setFilterdStock(stocks);
    } else {
      setFilterdStock(
        stocks.filter((name) =>
          name?.item_name?.toLowerCase().includes(search?.toLowerCase()),
        ),
      );
    }
  };

  const getStocks = async () => {
    const isConnected = Work.checkInternetConnection();
    if (isConnected) {
      setLoading(true);
      try {
        const response = await axios.get(
          `stocks/allStocks?page=${page}&limit=5`,
        );
        if (response?.data) {
          if (page == 1) {
            setStocks(response?.data?.data);
            setTotalPages(response?.data?.total_pages);
            setFilterdStock(response?.data?.data);
          } else {
            setStocks([...stocks, ...response?.data?.data]);
            setTotalPages(response?.data?.total_pages);
            setFilterdStock([...stocks, ...response?.data?.data]);
          }
        }
      } catch (error) {
        Work.showToast(error?.response?.data?.message || error?.message);
      }
      setLoading(false);
    } else Work.showToast(Work.INTERNET_CONNECTION_ERROR);
  };
  return (
    <SafeWrapper>
      <Header label="Stocks" drawer={navigation} />
      <Textinput
        onChangeText={(t) => onSearch(t)}
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
      {isLoading ? (
        <SkypeIndicator color={colors.primary} />
      ) : (
        <>
          <FlatList
            onRefresh={onRefresh}
            refreshing={isLoading}
            data={filteredStock}
            renderItem={({item}) => (
              <StockCard
                price={item?.price}
                qty={item?.quantity}
                name={item?.item_name}
                img={item?.img}
                onPress={() => {
                  const check = cart?.findIndex(
                    (data) => data?._id === item?._id,
                  );

                  if (check < 0) {
                    dispatch(addToCart({...item, orderQty: 1}));
                    Work.showToast('Item Added To Cart');
                  } else Work.showToast('Item Already Exist In Cart');
                }}
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

export default Stock;

const styles = StyleSheet.create({
  btnContainer: {
    marginVertical: WP('3'),
  },
});
