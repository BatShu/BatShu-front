import { User } from "firebase/auth";
import { API } from "../util/fetcher";
import { getAuthHeader } from "../util/header";
import { AppResponse } from "@/domain/models/appResponse";
import { AppUser } from "@/domain/models/appUser";

export class UserRepository {
  async readUserByAuth(fbUser: User): Promise<AppUser> {
    const headers = await getAuthHeader(fbUser);
    const res = await API.GET<AppResponse<AppUser>>("api/user", headers);
    if (res.ok) {
      return res.data;
    }
    throw new Error(res.msg);
  }

  async createUser(fbUser: User): Promise<void> {
    const headers = await getAuthHeader(fbUser);
    const res = await API.POST<AppResponse>("api/user", {
      ...headers,
      body: JSON.stringify({
        uid: fbUser.uid,
      }),
    });
    if (!res.ok) {
      throw new Error(res.msg);
    }
  }
}
