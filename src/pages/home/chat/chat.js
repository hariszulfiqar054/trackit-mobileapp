import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Ficon from 'react-native-vector-icons/FontAwesome';
import {
  Header,
  SafeWrapper,
  MessageComponent,
  Textinput,
  BtnWrapper,
} from '../../../shared/components';
import * as Work from '../../../shared/exporter';

const {
  WP,
  THEME: {colors},
} = Work;
const Chat = ({navigation}) => {
  return (
    <SafeWrapper>
      <KeyboardAwareScrollView>
        <Header label="Chat" drawer={navigation} />
        <MessageComponent
          message="hi my name is haris"
          date={Date.now()}
          sender
        />
        <View style={styles.msgContainer}>
          <Textinput
            placeholder="Type message..."
            containerStyle={{width: '85%'}}
          />
          <BtnWrapper>
            <View style={styles.sendBtnContainer}>
              <Ficon
                name="send"
                size={WP('5')}
                color={colors.white}
                style={{padding: WP('3.4')}}
              />
            </View>
          </BtnWrapper>
        </View>
      </KeyboardAwareScrollView>
    </SafeWrapper>
  );
};

export default Chat;

const styles = StyleSheet.create({
  sendBtnContainer: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: WP('7'),
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // position: 'absolute',
  },
});
