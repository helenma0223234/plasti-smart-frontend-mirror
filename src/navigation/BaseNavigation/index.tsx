import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign, Octicons, Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

import useAppSelector from 'hooks/useAppSelector';
import { UserScopes } from 'types/users';
import {
  FrontPage,
  ResourcesPage,
  UsersPage,
  ForbiddenPage,
  HomePage,
  CameraPage,
  ScanCompletePage,
  EducationPage,
  LeaderboardPage,
  ProgressPage,

} from 'screens/BaseScreens';
import { BaseTabRoutes, BaseNavigationList } from '../routeTypes';
import Colors from 'utils/Colors';
import useAppDispatch from 'hooks/useAppDispatch';
import { loadModel } from 'redux/slices/modelSlice';
import { useEffect } from 'react';
import FormatStyle from 'utils/FormatStyle';

const BaseTab = createBottomTabNavigator<BaseNavigationList>();
const BaseStack = createStackNavigator<BaseNavigationList>();

const ProtectedRoute = (allowableScopes: UserScopes[]) => {
  const { authenticated, role } = useAppSelector((state) => state.auth);

  return allowableScopes.includes(role) && authenticated;
};


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowAlert: true,
  }),
});

export const HomeNavigator = () => {
  return (
    <BaseStack.Navigator initialRouteName={BaseTabRoutes.HOME}>
      <BaseStack.Screen
        name={BaseTabRoutes.HOME}
        component={HomePage}
        options={{ header: () => null }}
      />
    </BaseStack.Navigator>
  );
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

const EducationNavigator = () => {
  return (
    <BaseStack.Navigator initialRouteName={BaseTabRoutes.EDUCATION}>
      <BaseStack.Screen
        name={BaseTabRoutes.EDUCATION}
        component={EducationPage}
        options={{ header: () => null }}
      />
      <BaseStack.Screen
        name={BaseTabRoutes.PROGRESS}
        component={ProgressPage}
        options={{ header: () => null }}
      />
    </BaseStack.Navigator>
  );
};

const LeaderboardNavigator = () => {
  return (
    <BaseStack.Navigator initialRouteName={BaseTabRoutes.LEADERBOARD}>
      <BaseStack.Screen
        name={BaseTabRoutes.LEADERBOARD}
        component={LeaderboardPage}
        options={{ header: () => null }}
      />
    </BaseStack.Navigator>
  );
};

const BaseNavigation = () => {
  const cameraOpen = useAppSelector((state) => state.camera.cameraOpen);
  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   // registerForPushNotificationsAsync();
  //   dispatch(loadModel());
  // }, []);

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => {
        // register / send to backend
      })
      .catch(error => {
        console.error(error);
      });
    dispatch(loadModel());
    schedulePushNotification()
      .catch(error => {
        console.error(error);
      });
  }, []);

  async function registerForPushNotificationsAsync(): Promise<string> {
    let token: string;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return '';
      }

      const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
      if (!projectId) {
        const errorMessage =
        'Project ID not found';
        alert(errorMessage);
        throw new Error(errorMessage);
      }
      try {
        const pushTokenString = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        return pushTokenString;
      } catch (e: unknown) {
        if (e instanceof Error) {
          throw new Error(e.message);
        } else { throw new Error(String(e));}
      } 
    } else {
      alert('Must use physical device for Push Notifications');
    }
  }

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got notification! 🔔",
        body: 'Here is the notification body',
        data: { data: 'goes here' },
      },
      // trigger: { seconds: 2 },
      trigger: { hour: 15, minute: 16, repeats: true },   // everyday at this time
    });
  }

  return (
    <NavigationContainer>
      <BaseTab.Navigator
        screenOptions={{
          header: () => null,
          tabBarStyle: {
            backgroundColor: Colors.secondary.white,
            height: 100,
            borderRadius: 20,

            display: cameraOpen ? 'none' : 'flex',
          },
          tabBarActiveTintColor: Colors.primary.dark,
          tabBarInactiveTintColor: Colors.neutral[2],
        }}
        initialRouteName={BaseTabRoutes.HOME}
      >


        <BaseTab.Screen
          name={BaseTabRoutes.HOME}
          component={HomeNavigator}
          options={{
            tabBarLabel: (props) => {
              return (null);
            },
            tabBarIcon: (props) => (
              <Feather name="home" size={40} color={props.color} />
            ),
          }}
        />
        <BaseTab.Screen
          name={BaseTabRoutes.EDUCATION}
          component={EducationNavigator}
          options={{
            tabBarLabel: (props) => {
              return (
                null
              );
            },
            tabBarIcon: (props) => (
              <Feather name="book-open" size={40} color={props.color} />),

            // <Feather name="user" size={40} color={props.color} />),
          }}
        />
        <BaseTab.Screen
          name={BaseTabRoutes.CAMERA}
          component={CameraNavigator}
          options={{
            tabBarLabel: (props) => {
              return null;
            },
            tabBarIcon: (props) => (
              <View style={{ ...FormatStyle.circle, width: 70, height: 70, backgroundColor: Colors.primary.dark, position: 'relative', bottom: 30 }}>
                <AntDesign name="camera" color={Colors.secondary.white} size={40} />
              </View>
            ),
          }}
        />
        <BaseTab.Screen
          name={BaseTabRoutes.LEADERBOARD}
          component={LeaderboardNavigator}
          options={{
            tabBarLabel: (props) => {
              return (
                null);
            },
            tabBarIcon: (props) => (
              <Feather name="bar-chart-2" size={40} color={props.color} />
            ),
          }}
        />
        <BaseTab.Screen
          name={BaseTabRoutes.FRONT}
          component={FrontNavigator}
          options={{
            tabBarLabel: (props) => {
              return (
                null);
            },
            tabBarIcon: (props) => (
              <Feather name="settings" size={40} color={props.color} />
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
