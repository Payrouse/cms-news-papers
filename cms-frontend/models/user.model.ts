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

export enum UserRoleForShow {
  Administrador = 1,
  Publicador = 2,
  Periodista = 3,
  Usuario = 4,
}

export enum userStatus{
  Activo = 0,
  Baneado = 1,
}

export const ROLE_OPTIONS: number[] = [2,3] 