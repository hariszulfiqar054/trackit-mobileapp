import React, { useEffect, useState, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import {
  Header,
  SafeWrapper,
  BtnWrapper,
  AnnouncementCard,
  Btn,
} from '../../../shared/components';
import * as Work from '../../../shared/exporter';
import Micon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { SkypeIndicator } from 'react-native-indicators';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import { useSelector } from 'react-redux';

const {
  WP,
  HP,
  THEME: { colors },
} = Work;
const Announcement = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);
  const isFocused = useIsFocused();
  const [currDate, setCurrDate] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [announcementData, setAnnouncementData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isLoading, setLoading] = useState(false);

  useLayoutEffect(() => {
    const result = getDate(Date.now(), 0);
    setCurrDate(
      Work.months[Number(result.month)] + ' ' + result.date + ' ' + result.year,
    );
    setYear(result.year);
    setMonth(Number(result.month));
  }, []);

  useEffect(() => {
    if (page > 1) {
      getAnnouncements(page);
    }
  }, [page]);

  const onRefresh = () => {
    setPage(1);
    getAnnouncements(1);
  };
  useEffect(() => {
    if (month >= 0) {
      setPage(1);
      getAnnouncements(1);
    }
  }, [month]);

  const getAnnouncements = async (p) => {
    const isConnected = await Work.checkInternetConnection();
    if (isConnected) {
      try {
        setLoading(true);
        const response = await axios.post(
          'announcements/getAnnouncmentByDate',
          {
            page: p,
            month: month + 1,
            year,
          },
        );
        if (response?.data) {
          if (p == 1) {
            setAnnouncementData(response.data?.data);
            setTotalPages(response.data?.total_pages);
          } else {
            setAnnouncementData([...announcementData, ...response.data?.data]);
            setTotalPages(response.data?.total_pages);
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

  const getDate = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);

    return {
      day: result.getDay(),
      date: result.getDate(),
      month: result.getMonth(),
      year: result.getFullYear(),
    };
  };

  return (
    <SafeWrapper>
      <Header label="Announcements" drawer={navigation} />
      <View>
        <Text style={styles.assignedAreaTxt}>
          Assigned Area : {user?.data?.area}
        </Text>
      </View>
      <View style={styles.dateChangeContainer}>
        <BtnWrapper
          onPress={() => {
            if (month > 0) setMonth((pre) => pre - 1);
          }}>
          <View style={styles.iconContainer}>
            <Micon
              style={{ padding: WP('1') }}
              name="keyboard-arrow-left"
              color={Work.THEME.colors.grey}
              size={WP('8')}
            />
          </View>
        </BtnWrapper>
        <View>
          <Text
            style={[styles.date, { fontWeight: 'bold', fontSize: WP('4.6') }]}>
            {Work.months[month]}
          </Text>
          <Text style={styles.date}>{currDate}</Text>
        </View>
        <BtnWrapper
          onPress={() => {
            if (month < 11) setMonth((pre) => pre + 1);
          }}>
          <View style={styles.iconContainer}>
            <Micon
              style={{ padding: WP('1') }}
              name="keyboard-arrow-right"
              color={Work.THEME.colors.grey}
              size={WP('8')}
            />
          </View>
        </BtnWrapper>
      </View>
      {isLoading ? (
        <SkypeIndicator color={colors.primary} size={WP('15')} />
      ) : announcementData?.length > 0 ? (
        <>
          <FlatList
            refreshing={isLoading}
            onRefresh={onRefresh}
            data={announcementData}
            renderItem={({ item }) => (
              <AnnouncementCard
                city={item?.city}
                message={item?.text}
                date={moment(item?.time_stamp).format('DD-MM-YYYY')}
              />
            )}
            keyExtractor={(item) => item?._id}
          />
          {totalPages > page ? (
            <Btn
              label="Load More"
              containerStyle={styles.btnContainer}
              labelStyle={{ fontSize: WP('3.7'), padding: WP('1') }}
              onPress={() => setPage((pre) => pre + 1)}
            />
          ) : null}
        </>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.noData}>Oops! No Announcement</Text>
        </View>
      )}
    </SafeWrapper>
  );
};

export default Announcement;

const styles = StyleSheet.create({
  dateChangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: WP('6'),
  },
  iconContainer: {
    backgroundColor: '#f1f1f1',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    color: '#51adcf',
    textAlign: 'center',
  },
  btnContainer: {
    marginVertical: WP('3'),
  },
  noData: {
    fontSize: WP('5'),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  assignedAreaTxt: {
    fontSize: WP('4'),
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
