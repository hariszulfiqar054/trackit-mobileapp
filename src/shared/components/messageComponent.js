import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Work from '../exporter';

const {
  WP,
  THEME: {colors},
} = Work;
const MessageComponent = ({sender, date, message}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>{message}</Text>
    </View>
  );
};

export default MessageComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightBlue,
    maxWidth: '60%',
    minWidth: '30%',
    borderRadius: 6,
    alignItems: 'center',
  },
  txt: {
    padding: WP('2'),
    fontSize: WP('4'),
    paddingVertical: WP('4'),
  },
});
