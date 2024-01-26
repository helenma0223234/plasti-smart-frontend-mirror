// import { NavigatorScreenParams } from '@react-navigation/native';
// Use NavigatorScreenParams to nest navigators within navigators

export enum AuthStackRoutes {
  LAUNCH = 'Launch',
  SIGNIN = 'Sign In',
  SIGNUP = 'Sign Up',
}

export type AuthNavigationList = {
  [AuthStackRoutes.LAUNCH]: Record<string, unknown>;
  [AuthStackRoutes.SIGNIN]: Record<string, unknown>;
  [AuthStackRoutes.SIGNUP]: Record<string, unknown>;
};

export enum BaseTabRoutes {
  FRONT = 'Front Page',
  USERS = 'Users',
  RESOURCES = 'Resources',
  FORBIDDEN = 'Forbidden',
}

export type BaseNavigationList = {
  [BaseTabRoutes.FRONT]: Record<string, unknown>;
  [BaseTabRoutes.USERS]: Record<string, unknown>;
  [BaseTabRoutes.RESOURCES]: Record<string, unknown>;
  [BaseTabRoutes.FORBIDDEN]: Record<string, unknown>;
};

export enum UserStackRoutes {
  CAMERA = 'Camera',
}

export type UserNavigationList = {
  [UserStackRoutes.CAMERA]: Record<string, unknown>;
};
