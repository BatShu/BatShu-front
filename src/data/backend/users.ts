import { User } from "firebase/auth";
import { API } from "../util/fetcher";

export class UserRepository {
  async readUser(fbUser: User) {
    const token = await fbUser.getIdToken();
    await API.GET("/api/user");
  }
}
