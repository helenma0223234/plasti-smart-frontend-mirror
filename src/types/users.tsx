export enum UserScopes {
  Unverified = 'UNVERIFIED',
  User = 'USER',
  Admin = 'ADMIN',
}
// TODO: change to reflect backend
export interface IUser {
  id: string
  email: string
  // no password
  name: string
  role: UserScopes
}