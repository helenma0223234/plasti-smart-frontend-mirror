interface INotificationSettings {
  userID: string
  deviceID: string
  generalPush: boolean
  dailyGoalPush: boolean
  avatarPush: boolean
  dailyGoalIdentifier: string
  avatarIdentifier: string
}

export default INotificationSettings;