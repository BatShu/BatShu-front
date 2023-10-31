import { useQuery } from "@tanstack/react-query";
import { userRepository } from "../backend";

export const useReadUserById = (uid: string) => {
  return useQuery({
    queryKey: ["user", uid],
    queryFn: async () => {
      return await userRepository.readUserByUid({ uid });
    },
  });
};
