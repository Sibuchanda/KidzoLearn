import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({ username: "", email: "" });
  const [loadingUser, setLoadingUser] = useState(true);
  
    // --- States for user progress ---
  const [progress, setProgress] = useState({
    username: "",
    points: 0,
    activityProgress: [],
  });
  const [loadingProgress, setLoadingProgress] = useState(true);

  // -- Fetching user profile ---
  useEffect(() => {
    const fetchUser = async () => {
      setLoadingUser(true);
      try {
        const res = await axios.get("https://kidzoschool.onrender.com/user/profile", {
          withCredentials: true
        });
        setUser({
          username: res.data.username,
          email: res.data.email
        });
      } catch (err) {
        console.error("Error fetching profile", err);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

  // ---------- Fetching user progress ------
  useEffect(() => {
    const fetchProgress = async () => {
      setLoadingProgress(true);
      try {
        const { data } = await axios.get(
          "https://kidzoschool.onrender.com/task/progress",
          { withCredentials: true }
        );
        setProgress({
          username: data.username || "",
          points: data.points || 0,
          activityProgress: data.activityProgress || [],
        });
      } catch (err) {
        console.error("Error fetching progress:", err);
      } finally {
        setLoadingProgress(false);
      }
    };

    fetchProgress();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loadingUser,
        progress,
        setProgress,
        loadingProgress
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
