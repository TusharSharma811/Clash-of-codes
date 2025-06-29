import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserData {
  userId: string;
  username: string;
  email: string;
}

interface UserState {
  userId: string | null;
  username: string | null;
  email: string | null;
  setUser: (user: UserData) => void;
  clearUser: () => void;
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      userId: null,
      username: null,
      email: null,

      setUser: (user: UserData) =>
        set({
          userId: user.userId,
          username: user.username,
          email: user.email,
        }),

      clearUser: () => set({ userId: null, username: null, email: null }),
    }),
    {
      name: "user-storage", // localStorage key
     
    }
  )
);
