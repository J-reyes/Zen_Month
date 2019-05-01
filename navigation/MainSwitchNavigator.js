import React from 'react';
import { Platform } from 'react-native';
import { createSwitchNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import Loading from '../screens/Loading';

const SwitchStack = createSwitchNavigator(
    {
        Login: LoginScreen,
        SignUp: SignUpScreen,
        Loading: Loading
    },
    {
        initialRouteName: 'Loading'
    });

export default SwitchStack