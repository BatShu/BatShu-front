import { User } from "firebase/auth";

export type AppUser = Pick<User, "displayName" | "uid" | "photoURL" | "email">;
