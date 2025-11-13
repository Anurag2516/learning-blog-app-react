import { createContext, useContext } from "react";
import { useAuthStorage } from "../hooks/useAuthStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useAuthStorage("users", []);
  const [currentUser, setCurrentUser] = useAuthStorage("currentUser", []);

  return (
    <AuthContext.Provider
      value={{ users, setUsers, currentUser, setCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
