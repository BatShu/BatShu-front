import { auth } from "@/data/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { create } from "zustand";

interface AuthStore {
  user: User | null;
  init: boolean;
  setUser: (user: User | null) => void;
}

onAuthStateChanged(auth, (user) => {
  useAuthStore.setState({ user, init: true });
});

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  init: false,
  setUser: (user) => set({ user, init: true }),
}));
