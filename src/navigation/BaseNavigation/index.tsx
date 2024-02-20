import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign, Octicons, Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import useAppSelector from 'hooks/useAppSelector';
import { UserScopes } from 'types/users';
import { FrontPage, ResourcesPage, UsersPage, ForbiddenPage, HomePage } from 'screens/BaseScreens';
import { BaseTabRoutes, BaseNavigationList } from '../routeTypes';
import Colors from 'utils/Colors';

const BaseTab = createBottomTabNavigator<BaseNavigationList>();
const BaseStack = createStackNavigator<BaseNavigationList>();

const ProtectedRoute = (allowableScopes: UserScopes[]) => {
  const { authenticated, role } = useAppSelector((state) => state.auth);

  return (allowableScopes.includes(role) && authenticated);
};

const FrontNavigator = () => {
  return (
    <BaseStack.Navigator initialRouteName={BaseTabRoutes.HOME}>
      <BaseStack.Screen
        name={BaseTabRoutes.HOME}
        component={HomePage}
        options={{ header: () => null }}
      />
      <BaseStack.Screen
        name={BaseTabRoutes.FRONT}
        component={FrontPage}
        options={{ header: () => null }}
      />
  
    </BaseStack.Navigator>
  );
};

const UsersNavigator = () => {
  return (
    <BaseStack.Navigator initialRouteName={BaseTabRoutes.USERS}>
      <BaseStack.Screen
        name={BaseTabRoutes.USERS}
        component={UsersPage}
        options={{ header: () => null }}
      />
    </BaseStack.Navigator>
  );
};

const ResourcesNavigator = () => {
  return (
    <BaseStack.Navigator initialRouteName={BaseTabRoutes.RESOURCES}>
      <BaseStack.Screen
        name={BaseTabRoutes.RESOURCES}
        component={ResourcesPage}
        options={{ header: () => null }}
      />
    </BaseStack.Navigator>
  );
};

const BaseNavigation = () => {
  return (
    <NavigationContainer>
      <BaseTab.Navigator
        screenOptions={{
          header: () => null,
          tabBarStyle: {
            backgroundColor: Colors.secondary.white,
            height: 100,
            borderRadius: 20,

          },
          tabBarActiveTintColor: Colors.primary.dark,
          tabBarInactiveTintColor: Colors.neutral[2],
        }}
        initialRouteName={BaseTabRoutes.HOME}
      >


        <BaseTab.Screen
          name={BaseTabRoutes.FRONT}
          component={FrontNavigator}
          options={{
            tabBarLabel: (props) => {
              return (null
              );
            },
            tabBarIcon: (props) => (
              <Feather name="home" size={40} color={props.color} />),
          }}
        />
        <BaseTab.Screen
          name={BaseTabRoutes.USERS}
          component={
            ProtectedRoute([UserScopes.Admin])
              ? UsersNavigator
              : ForbiddenPage
          }
          options={{
            tabBarLabel: (props) => {
              return (
                null
              );
            },
            tabBarIcon: (props) => (
              <Feather name="user" size={40} color={props.color} />),
          }}
        />
        <BaseTab.Screen
          name={BaseTabRoutes.RESOURCES}
          component={
            ProtectedRoute([UserScopes.User, UserScopes.Admin])
              ? ResourcesNavigator
              : ForbiddenPage
          }
          options={{
            tabBarLabel: (props) => {
              return (
                null);
            },
            tabBarIcon: (props) => (
              <Feather name="book-open" size={40} color={props.color} />),
          }}
        />
      </BaseTab.Navigator>
    </NavigationContainer>
  );
};

export default BaseNavigation;