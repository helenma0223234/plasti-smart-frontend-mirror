// import { NavigatorScreenParams } from '@react-navigation/native';
// Use NavigatorScreenParams to nest navigators within navigators

export enum AuthStackRoutes {
  LAUNCH = 'Launch',
  SIGNIN = 'Sign In',
  SIGNUP = 'Sign Up',
  ONBOARD = 'Onboard',
}

export type AuthNavigationList = {
  [AuthStackRoutes.ONBOARD]: Record<string, unknown>;
  [AuthStackRoutes.LAUNCH]: Record<string, unknown>;
  [AuthStackRoutes.SIGNIN]: Record<string, unknown>;
  [AuthStackRoutes.SIGNUP]: Record<string, unknown>;
};

export enum BaseTabRoutes {
  FRONT = 'FrontPage',
  USERS = 'Users',
  RESOURCES = 'Resources',
  FORBIDDEN = 'Forbidden',
  CAMERA = 'Camera',
  SCAN_COMPLETE = 'ScanComplete',
  HOME = 'Home',
  LEADERBOARD = 'Leaderboard',
  EDUCATION = 'Education',
  PROGRESS = 'Progress',
  MANUAL_ENTRY = 'ManualEntry',
  UNKNOWN_PLASTIC = 'UnknownPlastic',
  CAMERA_MODAL = 'CameraModal',
}

export type BaseNavigationList = {
  [BaseTabRoutes.FRONT]: Record<string, unknown>;
  [BaseTabRoutes.USERS]: Record<string, unknown>;
  [BaseTabRoutes.RESOURCES]: Record<string, unknown>;
  [BaseTabRoutes.FORBIDDEN]: Record<string, unknown>;
  [BaseTabRoutes.CAMERA]: Record<string, unknown>;
  [BaseTabRoutes.SCAN_COMPLETE]: Record<string, unknown>;
  [BaseTabRoutes.HOME]: Record<string, unknown>;
  [BaseTabRoutes.LEADERBOARD]: Record<string, unknown>;
  [BaseTabRoutes.EDUCATION]: Record<string, unknown>;
  [BaseTabRoutes.PROGRESS]: Record<string, unknown>;
  [BaseTabRoutes.MANUAL_ENTRY]: Record<string, unknown>;
  [BaseTabRoutes.UNKNOWN_PLASTIC]: Record<string, unknown>;
  [BaseTabRoutes.CAMERA_MODAL]: Record<string, unknown>;
};