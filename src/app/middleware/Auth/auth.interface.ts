import { TUserRole } from "../../modules/user/user.interface";

export interface IAuthData {
  userEmail: string;
  userId: string;
  userRole: TUserRole;
  iat: number;
  exp: number;
}
