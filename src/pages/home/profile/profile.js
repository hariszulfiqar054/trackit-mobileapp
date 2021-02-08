import React from 'react';
import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import {SafeWrapper, BtnWrapper} from '../../../shared/components';
import * as Work from '../../../shared/exporter';
import Micon from 'react-native-vector-icons/MaterialIcons';

const {
  WP,
  THEME: {colors},
} = Work;
const Profile = ({navigation}) => {
  return (
    <SafeWrapper>
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
    </SafeWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  imgBg: {
    width: '100%',
    height: '60%',
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
  },
});
