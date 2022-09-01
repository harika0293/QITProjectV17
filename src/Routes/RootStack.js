import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../PScreen/SplashScreen';
import Loader from '../PScreen/Loader';
import OnBoarding from '../PScreen/OnBoarding';
import ALoader from '../PScreen/ALoader';

import Login from '../PScreen/Login';
import OTPScreen from '../PScreen/OTPScreen';
import SucessScreen from '../PScreen/SucessScreen';
import Success2 from '../PScreen/Success2';

import BottomNavigator from './BottomNavigator';

import Home from '../PNavigation/Home';
import Analytics from '../PNavigation/Analytics';
import Notification from '../PNavigation/Notification';
import Chat from '../PNavigation/Chat';

import SelectDoctor from '../PScreen/SelectDoctor';
import PSetting from '../PScreen/PSetting';
import PHelp from '../PScreen/PHelp';
import PPatientDetails from '../PScreen/PPatientDetails';

import DLogin from '../DScreen/DLogin';
import DOTPScreen from '../DScreen/DOTPScreen';
import DSuccess from '../DScreen/DSuccess';
import DSuccess2 from '../DScreen/DSuccess2';

import DHome from '../DScreen/DHome';
import DPatientChat from '../DScreen/DPatientChat';
import DNotification from '../DScreen/DNotification';
import DSetting from '../DScreen/DSetting';

import DEditProfile from '../DScreen/DEditProfile';

import DoctorBottomTab from './DoctorBottomTab';
import DChat from '../DScreen/DChat';
import DDetails from '../DScreen/DDetails';
import DFilter from '../DScreen/DFilter';

import DHelp from '../DScreen/DHelp';

const RootStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="SplashScreen"
      component={SplashScreen}
      options={{headerShown: false}}
    />

    <Stack.Screen
      name="Loader"
      component={Loader}
      options={{headerShown: false}}
    />

    <RootStack.Screen
      name="OnBoarding"
      component={OnBoarding}
      options={{headerShown: false}}
    />

    <Stack.Screen
      name="ALoader"
      component={ALoader}
      options={{headerShown: false}}
    />

    <Stack.Screen
      name="Login"
      component={Login}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="OTPScreen"
      component={OTPScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="SucessScreen"
      component={SucessScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Success2"
      component={Success2}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="DSuccess2"
      component={DSuccess2}
      options={{headerShown: false}}
    />
    <RootStack.Screen
      name="DLogin"
      component={DLogin}
      options={{headerShown: false}}
    />

    <RootStack.Screen
      name="SelectDoctor"
      component={SelectDoctor}
      options={{headerShown: false}}
    />
    <RootStack.Screen
      name="DEditProfile"
      component={DEditProfile}
      options={{headerShown: false}}
    />

    <RootStack.Screen
      name="DOTPScreen"
      component={DOTPScreen}
      options={{headerShown: false}}
    />
    <RootStack.Screen
      name="DSuccess"
      component={DSuccess}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator>
      {/*  <RootStack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
  */}

      <RootStack.Screen
        name="AuthStack"
        component={AuthStack}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="BottomNavigator"
        component={BottomNavigator}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="DoctorBottomTab"
        component={DoctorBottomTab}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Details"
        component={DDetails}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="DFilter"
        component={DFilter}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="DDetails"
        component={DDetails}
        options={{headerShown: false}}
      />

      <RootStack.Screen
        name="PSetting"
        component={PSetting}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="PPatientDetails"
        component={PPatientDetails}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="PHelp"
        component={PHelp}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="DChat"
        component={DChat}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="DSetting"
        component={DSetting}
        options={{headerShown: false}}
      />

      <RootStack.Screen
        name="DHelp"
        component={DHelp}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
