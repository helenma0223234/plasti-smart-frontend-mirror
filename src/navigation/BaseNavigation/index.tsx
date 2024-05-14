import { View, TouchableWithoutFeedback } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign, Octicons, Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

import useAppSelector from 'hooks/useAppSelector';
import { UserScopes } from 'types/users';
import {
  FrontPage,
  HomePage,
  CameraPage,
  ScanCompletePage,
  EducationPage,
  LeaderboardPage,
  ProgressPage,
  ManualEntryPage,
  UnknownPlasticPage,
  UnknownInfoPage,
  AvatarCustomizationPage,
  SettingsPage,
  MascotPage
} from 'screens/BaseScreens';
import { BaseTabRoutes, BaseNavigationList } from '../routeTypes';
import Colors from 'utils/Colors';
import useAppDispatch from 'hooks/useAppDispatch';
import { loadModel } from 'redux/slices/modelSlice';
import { useEffect, useState } from 'react';
import FormatStyle from 'utils/FormatStyle';
import CameraOptionsModal from './CameraOptionsModal';

const BaseTab = createBottomTabNavigator<BaseNavigationList>();
const BaseStack = createStackNavigator<BaseNavigationList>();

const ProtectedRoute = (allowableScopes: UserScopes[]) => {
  const { authenticated, role } = useAppSelector((state) => state.auth);

  return allowableScopes.includes(role) && authenticated;
};
const EmptyComponent = () => null;

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
      <BaseStack.Screen
        name={BaseTabRoutes.AVATAR_CUSTOMIZATION}
        component={AvatarCustomizationPage}
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

export const MascotNavigator = () => {
  return (
    <BaseStack.Navigator initialRouteName={BaseTabRoutes.MASCOT}>
      <BaseStack.Screen
        name={BaseTabRoutes.MASCOT}
        component={MascotPage}
        options={{ header: () => null }}
      />
    </BaseStack.Navigator>
  );
}


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

export const SettingsNavigator = () => {
  return (
    <BaseStack.Navigator initialRouteName={BaseTabRoutes.SETTINGS}>
      <BaseStack.Screen
        name={BaseTabRoutes.SETTINGS}
        component={SettingsPage}
        options={{ header: () => null }}
      />
    </BaseStack.Navigator>
  );
};

const ManualEntryNavigator = () => {
  return (
    <BaseStack.Navigator initialRouteName={BaseTabRoutes.MANUAL_ENTRY}>
      <BaseStack.Screen
        name={BaseTabRoutes.MANUAL_ENTRY}
        component={ManualEntryPage}
        options={{ header: () => null }}
      />
    </BaseStack.Navigator>
  );
};

const UnknownPlasticNavigator = () => {
  return (
    <BaseStack.Navigator initialRouteName={BaseTabRoutes.UNKNOWN_PLASTIC}>
      <BaseStack.Screen
        name={BaseTabRoutes.UNKNOWN_PLASTIC}
        component={UnknownPlasticPage}
        options={{ header: () => null }}
      />
    </BaseStack.Navigator>
  );
};

const UnknownInfoNavigator = () => {
  return (
    <BaseStack.Navigator initialRouteName={BaseTabRoutes.UNKNOWN_INFO}>
      <BaseStack.Screen
        name={BaseTabRoutes.UNKNOWN_INFO}
        component={UnknownInfoPage}
        options={{ header: () => null }}
      />
    </BaseStack.Navigator>
  );
};

const BaseNavigation = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const cameraOpen = useAppSelector((state) => state.camera.cameraOpen);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const closeModal = () => {
    setModalVisible(false);
  };
  const navigation = useNavigation();

  useEffect(() => {
    // UNCOMMENT WHEN BUILDING FOR PRODUCTION
    // registerForPushNotificationsAsync()
    //   .then(token => {
    //     // register / send to backend
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
    // dispatch(loadModel());
    // schedulePushNotification()
    //   .catch(error => {
    //     console.error(error);
    //   });
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
    <View style={{ flex: 1 }}>
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
        initialRouteName={user?.avatarSet ? BaseTabRoutes.HOME: BaseTabRoutes.MASCOT}
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
          name={BaseTabRoutes.CAMERA_MODAL}
          component={EmptyComponent}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: (props) => (
              <View style={{ ...FormatStyle.circle, width: 70, height: 70, backgroundColor: Colors.primary.dark, position: 'relative', bottom: 20 }}>
                <AntDesign name="camera" color={Colors.secondary.white} size={40} />
              </View>
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              setModalVisible(currentVisible => !currentVisible);
            },
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
          name={BaseTabRoutes.SETTINGS}
          component={SettingsNavigator}
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
        <BaseTab.Screen
          name={BaseTabRoutes.UNKNOWN_PLASTIC}
          component={UnknownPlasticNavigator}
          options={{ tabBarButton: () => null }}
        />
        <BaseTab.Screen
          name={BaseTabRoutes.MANUAL_ENTRY}
          component={ManualEntryNavigator}
          options={{ tabBarButton: () => null }}
        />
        <BaseTab.Screen
          name={BaseTabRoutes.CAMERA}
          component={CameraNavigator}
          options={{ tabBarButton: () => null }}
        />
        <BaseTab.Screen
          name={BaseTabRoutes.UNKNOWN_INFO}
          component={UnknownInfoNavigator}
          options={{ tabBarButton: () => null }}
        />
        <BaseTab.Screen
          name={BaseTabRoutes.MASCOT}
          component={MascotNavigator}
          options={{ tabBarButton: () => null }}
        />

      </BaseTab.Navigator>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} pointerEvents={isModalVisible ? 'auto' : 'none'}>
          <CameraOptionsModal isVisible={isModalVisible} onClose={closeModal} navigation={navigation}/>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default BaseNavigation;
