import { useMutation } from "@tanstack/react-query";
import { signInWithRedirect } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

export const useSignInWithGoogle = () => {
  return useMutation({
    mutationKey: ["signInWithGoogle"],
    mutationFn: async () => {
      await signInWithRedirect(auth, googleProvider);
    },
  });
};

export const useSignOut = () => {
  return useMutation({
    mutationKey: ["signOut"],
    mutationFn: async () => {
      await auth.signOut();
    },
  });
};
