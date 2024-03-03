export enum UserScopes {
  Unverified = 'UNVERIFIED',
  User = 'USER',
  Admin = 'ADMIN',
}
// changed to reflect backend
export interface IUser {
  id: string;
  email: string;
  username: string;
  name?: string;
  pronoun?: string;
  role: UserScopes;
  teamID?: number;
  lastLogin: Date;
  avatar: number;
  avatarHealth: number;
  snacks: number;
  monthlyTotalScans: number;
  Type1Collected: number;
  Type2Collected: number;
  Type3Collected: number;
  Type4Collected: number;
  Type5Collected: number;
  Type6Collected: number;
  Type7Collected: number;
  monthlyGoalPlasticType: number;
  monthlyGoalPlasticAmount: number;
  monthlyGoalPlasticTotal: number;
}