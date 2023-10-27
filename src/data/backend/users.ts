import { User } from "firebase/auth";
import { authApi } from "../util/fetcher";
import { AppResponse } from "@/domain/models/appResponse";
import { AppUser } from "@/domain/models/appUser";

export class UserRepository {
  async readUserByUid({
    uid,
    token,
  }: {
    uid: string;
    token?: string;
  }): Promise<AppUser> {
    const res = await authApi.get<AppResponse<AppUser>>(`api/user/${uid}`, {
      headers: {
        Authorization: token == null ? undefined : `Bearer ${token}`,
      },
    });
    return res.data.data;
  }

  async createUser(fbUser: User): Promise<void> {
    await authApi.post("api/user", {
      uid: fbUser.uid,
    });
  }
}
