import React from "react";
import { Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import CameraPage from "screens/UserScreens";
import { UserStackRoutes, UserNavigationList } from "../routeTypes";

const UserStack = createStackNavigator<UserNavigationList>();

const UserNavigation = () => {
  return (
    <NavigationContainer>
      <UserStack.Navigator
        initialRouteName={UserStackRoutes.CAMERA}
        screenOptions={{ header: () => null }}
      >
        <UserStack.Screen name={UserStackRoutes.CAMERA} component={CameraPage} />
      </UserStack.Navigator>
    </NavigationContainer>
  );
};

