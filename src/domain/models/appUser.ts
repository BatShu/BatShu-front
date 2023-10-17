import { User } from "firebase/auth";

export interface AppUser extends Pick<User, "displayName" | "uid" | "email"> {
  googleProfilePhotoUrl: string;
}
