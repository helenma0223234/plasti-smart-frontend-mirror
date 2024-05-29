import * as Notifications from 'expo-notifications';

export async function scheduleAvatarPushNotification(hour: number, minute: number): Promise<string> {
  const identifier = await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got notification! Your pal is missing you 🔔",
      body: 'Come recycle some plastic and make your pal happy!',
      data: {},
    },
    trigger: { hour: hour, minute: minute, repeats: true },   // everyday at this time
  });

  return identifier;
}

export async function scheduleDailyGoalPushNotification(hour: number, minute: number) {
  const identifier = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Time to visit your daily goals! 🔔',
      body: 'Complete all three goals to get points! 🎁',
      data: {},
    },
    trigger: { hour: hour, minute: minute, repeats: true },
  });
  return identifier;
}