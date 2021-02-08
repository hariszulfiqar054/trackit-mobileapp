import React from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

const BtnWrapper = ({children, onPress}) => {
  return Platform.OS == 'android' ? (
    <TouchableNativeFeedback onPress={onPress}>
      {children}
    </TouchableNativeFeedback>
  ) : (
    <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
  );
};

export default React.memo(BtnWrapper);
