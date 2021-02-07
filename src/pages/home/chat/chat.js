import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header, SafeWrapper} from '../../../shared/components';

const Chat = ({navigation}) => {
  return (
    <SafeWrapper>
      <Header label="Chat" drawer={navigation} />
    </SafeWrapper>
  );
};

export default Chat;

const styles = StyleSheet.create({});
