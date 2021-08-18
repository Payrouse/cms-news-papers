export interface User {
  userName: string;
  avatar: string;
  firstName: string;
  lastName: string;
  role: number[];
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  ADMIN = 1,
  PUBLISHER = 2,
  JOURNALIST = 3,
  USER = 4,
}
