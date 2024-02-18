import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign, Octicons, Ionicons } from '@expo/vector-icons';
import useAppSelector from 'hooks/useAppSelector';
import { UserScopes } from 'types/users';
import {
  FrontPage,
  ResourcesPage,
  UsersPage,
  ForbiddenPage,
  CameraPage,
  ScanCompletePage,
} from 'screens/BaseScreens';
import { BaseTabRoutes, BaseNavigationList } from '../routeTypes';
import Colors from 'utils/Colors';
import useAppDispatch from 'hooks/useAppDispatch';
import { loadModel } from 'redux/slices/modelSlice';
import { useEffect } from 'react';

const BaseTab = createBottomTabNavigator<BaseNavigationList>();
const BaseStack = createStackNavigator<BaseNavigationList>();

const ProtectedRoute = (allowableScopes: UserScopes[]) => {
  const { authenticated, role } = useAppSelector((state) => state.auth);

  return allowableScopes.includes(role) && authenticated;
};

export const FrontNavigator = () => {
  return (
    <BaseStack.Navigator initialRouteName={BaseTabRoutes.FRONT}>
      <BaseStack.Screen
        name={BaseTabRoutes.FRONT}
        component={FrontPage}
        options={{ header: () => null }}
      />
    </BaseStack.Navigator>
  );
};

const ScanCompleteNavigator = () => {
  return (
    <BaseStack.Navigator initialRouteName={BaseTabRoutes.SCAN_COMPLETE}>
      <BaseStack.Screen
        name={BaseTabRoutes.SCAN_COMPLETE}
        component={ScanCompletePage}
        options={{ header: () => null }}
      />
    </BaseStack.Navigator>
  );
};

const CameraNavigator = () => {
  return (
    <BaseStack.Navigator initialRouteName={BaseTabRoutes.CAMERA}>
      <BaseStack.Screen
        name={BaseTabRoutes.CAMERA}
        component={CameraPage}
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
  const cameraOpen = useAppSelector((state) => state.camera.cameraOpen);
  useEffect(() => {
    useAppDispatch(loadModel());
  }, [] );

  return (
    <NavigationContainer>
      <BaseTab.Navigator
        screenOptions={{
          header: () => null,
          tabBarStyle: {
            backgroundColor: Colors.primary.normal,
            display: cameraOpen ? 'none' : 'flex',
          },
          tabBarActiveTintColor: Colors.secondary.white,
          tabBarInactiveTintColor: Colors.neutral[8],
        }}
        initialRouteName={BaseTabRoutes.FRONT}
      >
        <BaseTab.Screen
          name={BaseTabRoutes.FRONT}
          component={FrontNavigator}
          options={{
            tabBarLabel: (props) => {
              return <Text style={{ color: props.color }}>home</Text>;
            },
            tabBarIcon: (props) => (
              <AntDesign name="home" color={props.color} size={26} />
            ),
          }}
        />
        <BaseTab.Screen
          name={BaseTabRoutes.CAMERA}
          component={CameraNavigator}
          options={{
            tabBarLabel: (props) => {
              return <Text style={{ color: props.color }}>camera</Text>;
            },
            tabBarIcon: (props) => (
              <AntDesign name="camera" color={props.color} size={26} />
            ),
          }}
        />
        <BaseTab.Screen
          name={BaseTabRoutes.USERS}
          component={
            ProtectedRoute([UserScopes.Admin]) ? UsersNavigator : ForbiddenPage
          }
          options={{
            tabBarLabel: (props) => {
              return <Text style={{ color: props.color }}>users</Text>;
            },
            tabBarIcon: (props) => (
              <Ionicons name="person-outline" color={props.color} size={26} />
            ),
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
              return <Text style={{ color: props.color }}>resources</Text>;
            },
            tabBarIcon: (props) => (
              <Octicons name="graph" color={props.color} size={26} />
            ),
          }}
        />
        <BaseTab.Screen 
          name={BaseTabRoutes.SCAN_COMPLETE}
          component={ScanCompleteNavigator}
          options={{ tabBarButton: () => null }}
        />
      </BaseTab.Navigator>
    </NavigationContainer>
  );
};

export default BaseNavigation;
