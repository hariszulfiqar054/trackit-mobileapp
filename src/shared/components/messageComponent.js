import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Work from '../exporter';
import moment from 'moment';

const {
  WP,
  THEME: {colors},
} = Work;
const MessageComponent = ({sender, date, message}) => {
  return (
    <View
      style={[
        styles.container,
        {
          alignSelf: sender ? 'flex-end' : 'flex-start',
          backgroundColor: sender ? colors.lightBlue : '#d0e8f2',
        },
      ]}>
      <Text style={styles.txt}>{message}</Text>
      <Text style={styles.date}>{moment(date).format('DD-MM-yyyy')}</Text>
    </View>
  );
};

export default MessageComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightBlue,
    maxWidth: '60%',
    borderRadius: 6,
    marginStart: WP('3'),
    marginEnd: WP('3'),
    marginTop: WP('3'),
  },
  txt: {
    padding: WP('2'),
    fontSize: WP('4'),
    paddingVertical: WP('2'),
  },
  date: {
    fontSize: WP('3.5'),
    textAlign: 'right',
    paddingHorizontal: WP('3'),
    paddingBottom: WP('2'),
    color: colors.grey,
  },
});
