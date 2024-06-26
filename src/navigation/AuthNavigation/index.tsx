import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'; 
import { LaunchPage, OnboardingPage, SignInPage, SignUpPage } from 'screens/AuthScreens';
import { AuthStackRoutes, AuthNavigationList } from '../routeTypes';

const AuthStack = createStackNavigator<AuthNavigationList>();

const AuthNavigation = () => {
  return (
  // <NavigationContainer>
    <AuthStack.Navigator
      screenOptions={{ header: () => null }}
    >   
      <AuthStack.Screen name={AuthStackRoutes.LAUNCH} component={LaunchPage} />
      <AuthStack.Screen name={AuthStackRoutes.SIGNIN} component={SignInPage} />
      <AuthStack.Screen name={AuthStackRoutes.SIGNUP} component={SignUpPage} />
      <AuthStack.Screen name={AuthStackRoutes.ONBOARD} component={OnboardingPage} />

    </AuthStack.Navigator>
  // </NavigationContainer>
  );
};

export default AuthNavigation;