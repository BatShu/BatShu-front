import { User } from "firebase/auth";
import { API } from "../util/fetcher";
import { getAuthHeader } from "../util/header";
import { AppResponse } from "@/domain/models/appResponse";
import { AppUser } from "@/domain/models/appUser";

export class UserRepository {
  async readUserByAuth(fbUser: User): Promise<AppUser> {
    const headers = await getAuthHeader(fbUser);
    const res = await API.GET<AppResponse<AppUser>>("api/user", headers);
    return res.data;
  }

  async createUser(fbUser: User): Promise<void> {
    const headers = await getAuthHeader(fbUser);
    await API.POST<AppResponse>("api/user", {
      ...headers,
      body: JSON.stringify({
        uid: fbUser.uid,
      }),
    });
  }
}
