import { createContext, useContext, useState, useEffect } from "react";
const VITE_BACKEND_URI = import.meta.env.VITE_BACKEND_URI;
import axios from "axios";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({ userame: "", email: "" });

  useEffect(() => {
    axios.get(`${VITE_BACKEND_URI}/user/profile`, { withCredentials: true })
      .then(res => {
        setUser({
          username: res.data.username,
          email: res.data.email
        });
      })
      .catch(err => console.error("Error fetching profile", err));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
