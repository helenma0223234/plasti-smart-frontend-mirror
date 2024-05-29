import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

export async function registerForPushNotificationsAsync(): Promise<string> {
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

// async function registerForPushNotificationsAsync(): Promise<string> {
//   let token: string;
//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;

//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return '';
//     }

//     const projectId =
//     Constants?.expoConfig?.extra?.eas?.projectId ??
//     Constants?.easConfig?.projectId;
//     if (!projectId) {
//       const errorMessage =
//       'Project ID not found';
//       alert(errorMessage);
//       throw new Error(errorMessage);
//     }
//     try {
//       const pushTokenString = (
//         await Notifications.getExpoPushTokenAsync({
//           projectId,
//         })
//       ).data;
//       return pushTokenString;
//     } catch (e: unknown) {
//       if (e instanceof Error) {
//         throw new Error(e.message);
//       } else { throw new Error(String(e));}
//     } 
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }
// }