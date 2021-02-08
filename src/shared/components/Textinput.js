import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Input} from 'react-native-elements';
import * as Work from '../exporter';

const {
  WP,
  THEME: {colors},
} = Work;
const Textinput = (props) => {
  return (
    <Input
      inputContainerStyle={[
        styles.inputContainer,
        {borderColor: props.isError ? 'red' : null},
      ]}
      inputStyle={styles.inputStyle}
      {...props}
    />
  );
};

export default React.memo(Textinput);

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.lightGrey,
    height: 50,
    borderRadius: 9,
  },
  inputStyle: {
    padding: WP('2'),
    fontSize: WP('4.2'),
  },
});
