import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {
  SafeWrapper,
  Btn,
  Textinput,
  BtnWrapper,
} from '../../../shared/components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Eicon from 'react-native-vector-icons/Entypo';
import * as Work from '../../../shared/exporter';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import * as AuthJobs from '../../../store/actions/auth.action';

const {
  WP,
  HP,
  THEME: {colors},
} = Work;
const Login = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const loginHandler = async ({phone, password}) => {
    const isConnected = await Work.checkInternetConnection();
    if (isConnected) {
      setLoading(true);
      try {
        const response = await axios.post('user/loginSalesman', {
          contact: phone,
          password,
        });
        dispatch(AuthJobs.saveUser(response?.data));
      } catch (error) {
        console.log('HERE');
        console.log(error);
        Work.showToast(error?.response?.data?.message);
      }
      setLoading(false);
    } else Work.showToast(Work.INTERNET_CONNECTION_ERROR);
  };

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
      <SafeWrapper style={{backgroundColor: '#666F88'}}>
        <Text style={styles.welcome}>Welcome</Text>
        <Text style={styles.heading}>Please Sign in to continue!</Text>
        <Formik
          initialValues={{
            phone: '+92',
            password: '',
          }}
          validationSchema={Yup.object({
            phone: Yup.string().required('Required'),
            password: Yup.string().required('Required'),
          })}
          onSubmit={(values, formikActions) => {
            if (values.phone.substring(0, 3) !== '+92') {
              Work.showToast(
                'Enter the right format of number i.e +92xxxxxxxxx',
              );
            } else loginHandler(values);
          }}>
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            errors,
            touched,
            values,
          }) => (
            <View style={styles.subContainer}>
              <Image
                style={styles.img}
                source={require('../../../assets/img/Frame.png')}
              />
              <Textinput
                label="Phone no."
                placeholder="Enter Phone no..."
                keyboardType="phone-pad"
                onChangeText={handleChange('phone')}
                value={values.phone}
                isError={errors.phone || touched.phone ? errors.phone : null}
              />
              <Textinput
                label="Password"
                placeholder="Enter Password..."
                secureTextEntry={showPassword}
                onChangeText={handleChange('password')}
                value={values.password}
                isError={
                  errors.password || touched.password ? errors.password : null
                }
                rightIcon={
                  !showPassword ? (
                    <BtnWrapper onPress={() => setShowPassword(true)}>
                      <Eicon
                        name="eye"
                        size={WP('5')}
                        style={{marginEnd: WP('3')}}
                        color={colors.lightGrey}
                      />
                    </BtnWrapper>
                  ) : (
                    <BtnWrapper onPress={() => setShowPassword(false)}>
                      <Eicon
                        name="eye-with-line"
                        size={WP('5')}
                        style={{marginEnd: WP('3')}}
                        color={colors.lightGrey}
                      />
                    </BtnWrapper>
                  )
                }
              />
              <BtnWrapper>
                <Text style={styles.forgetPassword}>Forget Password?</Text>
              </BtnWrapper>
              <Btn
                label="Login"
                containerStyle={{marginTop: HP('14'), marginBottom: WP('5')}}
                onPress={isLoading ? null : handleSubmit}
                isLoading={isLoading}
              />
            </View>
          )}
        </Formik>
      </SafeWrapper>
    </KeyboardAwareScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  welcome: {
    fontSize: WP('6'),
    color: colors.white,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    paddingStart: WP('4'),
    paddingTop: WP('6'),
  },
  heading: {
    fontSize: WP('4.5'),
    color: colors.white,
    paddingStart: WP('4'),
    paddingBottom: WP('7'),
  },
  subContainer: {
    backgroundColor: colors.white,
    flex: 1,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  },
  img: {
    height: WP('40'),
    width: WP('40'),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: WP('8'),
  },
  forgetPassword: {
    color: colors.grey,
    fontSize: WP('4'),
    textAlign: 'right',
    marginEnd: WP('5'),
    marginTop: -WP('3'),
  },
});
