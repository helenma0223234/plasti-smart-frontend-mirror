import { AvatarCustomization } from './avatars';

export enum UserScopes {
  Unverified = 'UNVERIFIED',
  User = 'USER',
  Admin = 'ADMIN',
}

// changed to reflect backend
// export interface IUser {
//   id: string;
//   email: string;
//   username: string;
//   name?: string;
//   // pronoun?: string;
//   role: UserScopes;
//   // teamID?: number;
//   lastLogin: Date;
//   avatar: number;
//   avatarHealth: number;
//   snacks: number;
//   monthlyTotalScans: number;
//   Type1Collected: number;
//   Type2Collected: number;
//   Type3Collected: number;
//   Type4Collected: number;
//   Type5Collected: number;
//   Type6Collected: number;
//   Type7Collected: number;
//   monthlyGoalPlasticType: number;
//   monthlyGoalPlasticAmount: number; // amount so far
//   monthlyGoalPlasticTotal: number; // goal of the month
// }

export interface IUser {
  id: string;
  email: string;
  username: string;
  name?: string;
  role: UserScopes;
  lastLogin: Date;
  rank : number;
  avatarID: number;
  avatarColor: number;
  avatarHealth: number;
  avatarAccessoryEquipped: number;
  avatarCustomization: AvatarCustomization;
  points: number;
  monthlyPoints: number;
  monthlyTotalReused: number;
  monthlyTotalRecycled: number;
  Type1Recycled: number;
  Type2Recycled: number;
  Type3Recycled: number;
  Type4Recycled: number;
  Type5Recycled: number;
  Type6Recycled: number;
  Type7Recycled: number;
  Type1Reused: number;
  Type2Reused: number;
  Type3Reused: number;
  Type4Reused: number;
  Type5Reused: number;
  Type6Reused: number;
  Type7Reused: number;
};