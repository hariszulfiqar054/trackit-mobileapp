import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Work from '../exporter';
import BtnWrapper from './btnWrapper';
import {DotIndicator} from 'react-native-indicators';

const {
  THEME: {colors},
  WP,
} = Work;
const Btn = ({containerStyle, labelStyle, label, onPress, isLoading}) => {
  return (
    <BtnWrapper onPress={isLoading ? null : onPress}>
      <View style={[styles.container, containerStyle]}>
        {isLoading ? (
          <DotIndicator size={WP('3')} color={colors.white} />
        ) : (
          <Text style={[styles.label, labelStyle]}>{label}</Text>
        )}
      </View>
    </BtnWrapper>
  );
};

export default React.memo(Btn);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    width: '85%',
    alignSelf: 'center',
    height: WP('13'),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    borderRadius: 4,
  },
  label: {
    color: colors.white,
    fontSize: WP('4.8'),
  },
});
