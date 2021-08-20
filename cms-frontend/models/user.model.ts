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
  Administrador = 1,
  Publicador = 2,
  Periodista = 3,
  Usuario = 4,
}

export enum userStatus{
  Activo = 0,
  Baneado = 1,
}