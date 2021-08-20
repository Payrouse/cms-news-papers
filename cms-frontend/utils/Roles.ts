import { UserRole } from '../models/user.model';

// export const ShowRoute = (userRoles: number[]) => {
//   return userRoles.some((role) => user.role.includes(role));
// };

export const OnlyAdmin = (userRoles: number[]) => {
  return userRoles.includes(UserRole.ADMIN);
};

export const OnlyJournalist = (userRoles: number[]) => {
  if (userRoles.includes(UserRole.ADMIN)) return true;
  if (userRoles.includes(UserRole.JOURNALIST)) return true;
  return false;
};

export const OnlyPublisher = (userRoles: number[]) => {
  if (userRoles.includes(UserRole.ADMIN)) return true;
  if (userRoles.includes(UserRole.PUBLISHER)) return true;
  return false;
};
