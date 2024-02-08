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
  FRONT = 'Front Page',
  USERS = 'Users',
  RESOURCES = 'Resources',
}

export type BaseNavigationList = {
  [BaseTabRoutes.FRONT]: Record<string, unknown>;
  [BaseTabRoutes.USERS]: Record<string, unknown>;
  [BaseTabRoutes.RESOURCES]: Record<string, unknown>;
};