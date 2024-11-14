import type { UserRole } from "../constants/user";

export interface User {
  id: string;
  username: string;
  avatar?: string;
  roles?: UserRole[];
}

export interface UserSchema {
  authData?: User;
  _initiated?: boolean;
}
