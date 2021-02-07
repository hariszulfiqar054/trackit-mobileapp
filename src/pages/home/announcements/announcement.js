import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Header,
  SafeWrapper,
  BtnWrapper,
  AnnouncementCard,
} from '../../../shared/components';
import * as Work from '../../../shared/exporter';
import Micon from 'react-native-vector-icons/MaterialIcons';

const {
  WP,
  THEME: {colors},
} = Work;
const Announcement = ({navigation}) => {
  const [currDate, setCurrDate] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    const result = getDate(Date.now(), 0);
    setCurrDate(
      Work.months[Number(result.month)] + ' ' + result.date + ' ' + result.year,
    );
    setYear(result.year);
    setMonth(Number(result.month));
  }, []);

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
      <View style={styles.dateChangeContainer}>
        <BtnWrapper
          onPress={() => {
            if (month > 0) setMonth((pre) => pre - 1);
          }}>
          <View style={styles.iconContainer}>
            <Micon
              style={{padding: WP('1')}}
              name="keyboard-arrow-left"
              color={Work.THEME.colors.grey}
              size={WP('8')}
            />
          </View>
        </BtnWrapper>
        <View>
          <Text
            style={[styles.date, {fontWeight: 'bold', fontSize: WP('4.6')}]}>
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
              style={{padding: WP('1')}}
              name="keyboard-arrow-right"
              color={Work.THEME.colors.grey}
              size={WP('8')}
            />
          </View>
        </BtnWrapper>
      </View>
      <AnnouncementCard
        city="Lahore"
        message="A new announcement is posted"
        date="12/3/2021"
      />
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
});
