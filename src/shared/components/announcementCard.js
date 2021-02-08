import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Work from '../exporter';

const {
  WP,
  THEME: {colors},
} = Work;
const AnnouncementCard = ({city, message, date}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.sideTxt}>{city}</Text>
        <Text style={styles.sideTxt}>{date}</Text>
      </View>
      <Text style={styles.txt}>{message}</Text>
    </View>
  );
};

export default React.memo(AnnouncementCard);

const styles = StyleSheet.create({
  container: {
    width: '85%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.lightGrey,
    borderRadius: 7,
    marginTop: WP('8'),
  },
  txt: {
    padding: WP('3'),
    fontSize: WP(4.2),
  },
  sideTxt: {
    fontSize: WP('3.8'),
    color: colors.grey,
    paddingHorizontal: WP('2'),
    paddingTop: WP('2'),
  },
});
