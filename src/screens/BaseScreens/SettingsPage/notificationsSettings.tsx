import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Dimensions, SafeAreaView } from 'react-native';
import { BaseTabRoutes, BaseNavigationList } from 'navigation/routeTypes';
import type { StackNavigationProp } from '@react-navigation/stack';

import useAppSelector from 'hooks/useAppSelector';
import useAppDispatch from 'hooks/useAppDispatch';
import { updateNotificationSettings } from 'redux/slices/notificationSlice';
import { scheduleAvatarPushNotification, scheduleDailyGoalPushNotification } from 'components/Notifications/pushNotifications';
import * as Notifications from 'expo-notifications';

import Colors from 'utils/Colors';

type NotificationsSettingsPageProps = {
  navigation: StackNavigationProp<BaseNavigationList>;
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

type NotificationType = 'dailyGoalIdentifier' | 'avatarIdentifier';

const NotificationsSettingsPage = ({ navigation } : NotificationsSettingsPageProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.users.selectedUser);
  const notificationSettings = useAppSelector((state) => state.notifications.settings);

  
  const [isEnabled, setIsEnabled] = useState(notificationSettings?.generalPush);

  const [isEnabled2, setIsEnabled2] = useState(notificationSettings?.dailyGoalPush);

  const [isEnabled3, setIsEnabled3] = useState(notificationSettings?.avatarPush);

  const handleNotification = (notificationType: NotificationType, value: boolean) => {
    if (value) {
      if (notificationSettings?.[notificationType]) {
        // cancel the previous notification if there was one
        Notifications.cancelScheduledNotificationAsync(notificationSettings[notificationType]);
      }
  
      // schedule a new notification and update the identifier on the backend
      const scheduleNotification = notificationType === 'dailyGoalIdentifier' ? scheduleDailyGoalPushNotification : scheduleAvatarPushNotification;
      let scheduleHour = 8;
      let scheduleMinute = 0;
      if (notificationType === 'avatarIdentifier') {
        scheduleHour = 16; // 4 PM
        scheduleMinute = 0;
      }
      scheduleNotification(scheduleHour, scheduleMinute)
        .then(identifier => {
          // update the identifier
          dispatch(updateNotificationSettings({ userID: user?.id, [notificationType]: identifier }));
        })
        .catch(error => {
          console.error(error);
        });
    } else if (!value && notificationSettings?.[notificationType]) {
      Notifications.cancelScheduledNotificationAsync(notificationSettings[notificationType]);
    }
  };

  const handleGeneralToggle = async (value: boolean) => {
    setIsEnabled(value);
    setIsEnabled2(value);
    setIsEnabled3(value);
    dispatch(updateNotificationSettings({ userID: user?.id, generalPush: value, dailyGoalPush: value, avatarPush: value }));
    await Notifications.cancelAllScheduledNotificationsAsync();
    if (notificationSettings) {
      Notifications.cancelScheduledNotificationAsync(notificationSettings.dailyGoalIdentifier);
      Notifications.cancelScheduledNotificationAsync(notificationSettings.avatarIdentifier);
      if (value) {
        handleNotification('dailyGoalIdentifier', value);
        handleNotification('dailyGoalIdentifier', value);
      }
    }
    
  };

  const handleToggle = (switchName: string, value: boolean) => {
    switch (switchName) {
      case 'dailyGoal':
        setIsEnabled2(value);
        dispatch(updateNotificationSettings({ userID: user?.id, dailyGoalPush: value }));
        handleNotification('dailyGoalIdentifier', value);
        break;
      case 'avatar':
        setIsEnabled3(value);
        dispatch(updateNotificationSettings({ userID: user?.id, avatarPush: value }));
        handleNotification('avatarIdentifier', value);
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overall}>
        <TouchableOpacity style={styles.arrowBorder} onPress={() => { navigation.goBack(); }}>
          <AntDesign name="arrowleft" size={24} color="rgba(27, 69, 60, 1)" style={{ alignSelf: 'center' }} />
        </TouchableOpacity>

        <Text style={styles.header}> Notifications Settings</Text>

        <View style={styles.updateField}>
          <Text style={styles.updateTextField}>Turn on push notifications</Text>
          <View style={styles.switchContainer}>
            <Switch
              trackColor={{ false: 'rgba(206, 210, 206, 1)', true: 'rgba(204, 85, 78, 1)' }}
              thumbColor={isEnabled ? 'white' : 'white'}
              value={isEnabled}
              onValueChange={(value) => handleGeneralToggle(value)}
            />
          </View>
        </View>

        <View style={styles.updateField}>
          <Text style={styles.updateTextField}>Daily goal notifications</Text>
          <View style={styles.switchContainer}>
            <Switch
              trackColor={{ false: 'rgba(206, 210, 206, 1)', true: 'rgba(204, 85, 78, 1)' }}
              thumbColor={isEnabled2 ? 'white' : 'white'}
              value={isEnabled2}
              onValueChange={(value) => handleToggle('dailyGoal', value)}
            />
          </View>
        </View>

        <View style={styles.updateField}>
          <Text style={styles.updateTextField}>Avatar notifications</Text>
          <View style={styles.switchContainer}></View>
          <Switch
            trackColor={{ false: 'rgba(206, 210, 206, 1)', true: 'rgba(204, 85, 78, 1)' }}
            thumbColor={isEnabled3 ? 'white' : 'white'}
            value={isEnabled3}
            onValueChange={(value) => handleToggle('avatar', value)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBF4',
  },
  overall:{
    margin:screenWidth * 0.05,
  },
  arrowBorder:{
    borderColor: 'rgba(27, 69, 60, 1)',
    borderWidth: 1,
    borderStyle: 'solid',
    height: screenHeight * 0.05,
    width: screenHeight * 0.05,
    borderRadius: 100,
    marginBottom: screenHeight * 0.02,
    justifyContent: 'center',
  },
  header:{
    fontSize: 30,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 36,
    letterSpacing: -0.3,
    color:Colors.primary.dark,
    marginBottom: screenHeight * 0.03,
  },
  updateField: {
    borderBottomWidth: 1, 
    borderBottomColor: 'rgba(173, 192, 171, 1)', 
    display:'flex', 
    flexDirection:'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginBottom: screenHeight * 0.01,
  },
  switchContainer: {
    position: 'absolute',
    top: screenHeight * 0.007,
    right: screenWidth * 0.01,
  },
  updateTextField:{
    color: Colors.primary.dark,
    fontSize: screenHeight * 0.022,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 36,
    letterSpacing: 0.2,
    marginBottom: screenHeight * 0.014,
  },
});

export default NotificationsSettingsPage;