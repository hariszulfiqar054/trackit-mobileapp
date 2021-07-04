import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import {
  SafeWrapper,
  BtnWrapper,
  Textinput,
  Btn,
} from '../../../shared/components';
import * as Work from '../../../shared/exporter';
import Micon from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useSelector } from 'react-redux';

const {
  WP,
  HP,
  THEME: { colors },
} = Work;
const Profile = ({ navigation }) => {
  const user = useSelector((state) => state?.auth?.user);
  return (
    <SafeWrapper>
      <KeyboardAwareScrollView>
        <ImageBackground
          style={styles.imgBg}
          source={require('../../../assets/img/profilebg.png')}>
          <View style={styles.headerContainer}>
            <BtnWrapper onPress={() => navigation.goBack()}>
              <Micon
                style={styles.icon}
                color={colors.white}
                size={WP('8')}
                name="keyboard-arrow-left"
              />
            </BtnWrapper>

            <Text style={styles.headerLabel}>PROFILE</Text>
          </View>
          <BtnWrapper onPress={() => console.log('JI')}>
            <Image
              style={styles.img}
              source={{
                uri:
                  'https://www.xovi.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png',
              }}
            />
          </BtnWrapper>
        </ImageBackground>
        <View style={styles.fieldsContainer}>
          <Textinput label="Name" disabled value={user?.data?.name} />
          <Textinput
            label="Phone no."
            keyboardType="phone-pad"
            disabled
            value={user?.data?.contact}
          />
          <Textinput label="Password" value={user?.data?.password} disabled />
        </View>
      </KeyboardAwareScrollView>
    </SafeWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  imgBg: {
    width: '100%',
    height: HP('30'),
  },
  headerLabel: {
    fontSize: WP('6'),
    color: colors.white,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: WP('5'),
    justifyContent: 'center',
  },
  icon: {
    padding: WP('3'),
    position: 'absolute',
    left: '2%',
  },
  img: {
    width: WP('25'),
    height: WP('25'),
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: WP('20'),
    borderWidth: 1,
    borderColor: colors.grey,
  },
  fieldsContainer: {
    flex: 1,
  },
});
