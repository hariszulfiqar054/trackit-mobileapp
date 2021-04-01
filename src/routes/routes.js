import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Login,
  Cart,
  Profile,
  ShopInfo,
  OrderSuccess,
  OrderDetail,
} from '../pages/index';
import Dashboard from '../shared/navigator/drawerNavigator';
import {useSelector} from 'react-redux';

const Routes = () => {
  const user = useSelector((state) => state?.auth?.user);
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user == null ? (
          <Stack.Screen
            name="login"
            component={Login}
            options={{headerShown: false}}
          />
        ) : (
          <>
            <Stack.Screen
              name="dashboard"
              component={Dashboard}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="cart"
              component={Cart}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="profile"
              component={Profile}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="shopInfo"
              component={ShopInfo}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="orderSuccess"
              component={OrderSuccess}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="orderDetail"
              component={OrderDetail}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
