import { userRepository } from "@/data/backend";
import { auth } from "@/data/firebase";
import { AppApiError } from "@/domain/models/appError";
import { AppUser } from "@/domain/models/appUser";
import { handleError } from "@/lib";
import { User, onAuthStateChanged } from "firebase/auth";
import { create } from "zustand";

interface AuthStore {
  fbUser: User | null;
  appUser: AppUser | null;
  init: boolean;
  setUser: (user: User | null) => void;
}

onAuthStateChanged(auth, async (fbUser) => {
  if (fbUser == null) {
    useAuthStore.setState({ fbUser: null, appUser: null, init: true });
    return;
  }
  let appUser: AppUser | null = null;

  const token = await fbUser.getIdToken();
  try {
    appUser = await userRepository.readUserByUid({
      uid: fbUser.uid,
      token: token,
    });
  } catch (e) {
    const err = handleError(e);
    if (err instanceof AppApiError && err.status === 400) {
      await userRepository.createUser(fbUser);
      try {
        appUser = await userRepository.readUserByUid({
          uid: fbUser.uid,
          token: token,
        });
      } catch (e) {
        const err = handleError(e);
        console.log(err);
      }
    }
  }
  useAuthStore.setState({ fbUser: fbUser, appUser: appUser, init: true });
});

export const useAuthStore = create<AuthStore>((set) => ({
  fbUser: null,
  appUser: null,
  init: false,
  setUser: (user) => set({ fbUser: user, init: true }),
}));
