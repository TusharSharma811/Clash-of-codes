import { useEffect, useState } from "react";
import axios from "axios";
import { useUserStore } from "@/Store/userstore";


export interface User {
  _id: string;
  username: string;
  email: string;
  // Add other fields as needed
}

export type UseUserResult = {
  user: User | null;  
  loading: boolean;
  error: string | null;
};

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token"); // or your preferred key
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("/server/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("User data fetched:", res.data.user);
        delete res.data.user.password; // Remove sensitive data if needed
        setUser(res.data.user); 
        useUserStore.getState().setUser({
          userId: res.data.user._id,
          username: res.data.user.username,
          email: res.data.user.email,
        });
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
}
