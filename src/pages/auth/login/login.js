import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Btn from '../../../shared/components/btn';
import SafeWrapper from '../../../shared/components/safeWrapper';

const Login = () => {
  return (
    <SafeWrapper>
      <Text>Login</Text>
      <Btn label="Login" />
    </SafeWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({});
