import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { formatDateTime } from "../utils/formatDateTime";

export const useSignup = () => {
  const navigate = useNavigate();
  const { users, setUsers, setCurrentUser } = useAuth();

  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState({});
  const [isUserAvailable, setIsUserAvailable] = useState(null);

  const isCredentialsValid = () => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]).{8,64}$/;

    const isEmailValid = emailRegex.test(userEmail);
    const isPasswordValid = passwordRegex.test(userPassword);
    const isUsernameValid = username.trim();

    if (!isEmailValid || !isPasswordValid || !isUsernameValid) {
      setError({
        isEmailError: !isEmailValid
          ? "Please enter a valid email address."
          : "",
        isPasswordError: !isPasswordValid
          ? "Password must be 8-64 characters, include uppercase, lowercase, number, and special character."
          : "",
        isUsernameError: !isUsernameValid ? "Please enter a username." : "",
      });
    }

    return isEmailValid && isPasswordValid && isUsernameValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isCredentialsValid()) {
      const userFound = users.some(
        (i) => i.userEmail === userEmail || i.userPassword === userPassword
      );

      if (userFound) {
        setIsUserAvailable(true);
        return;
      }
      const newUser = {
        userId: `user_${crypto.randomUUID()}`,
        createdAt: new Date().toISOString(),
        username,
        userEmail,
        userPassword,
      };
      setUsers((prev) => [...prev, newUser]);
      setCurrentUser([newUser]);
      navigate("/");
    } else return;
  };

  return {
    navigate,
    username,
    setUsername,
    userEmail,
    setUserEmail,
    userPassword,
    setUserPassword,
    error,
    setError,
    isUserAvailable,
    setIsUserAvailable,
    handleSubmit,
  };
};
