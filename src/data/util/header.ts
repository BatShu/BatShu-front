import { User } from "firebase/auth";

export const getAuthHeader = async (fbUser: User) => {
  const token = await fbUser.getIdToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
