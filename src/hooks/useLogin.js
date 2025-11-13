import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const useLogin = () => {
  const navigate = useNavigate();
  const { users, setCurrentUser } = useAuth();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userNotFound, setUserNotFound] = useState(null);
  const [error, setError] = useState({});

  const isCredentialsValid = () => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]).{8,64}$/;

    const isEmailValid = emailRegex.test(userEmail);
    const isPasswordValid = passwordRegex.test(userPassword);

    if (!isEmailValid || !isPasswordValid) {
      setError({
        isEmailError: !isEmailValid
          ? "Please enter a valid email address."
          : "",
        isPasswordError: !isPasswordValid
          ? "Password must be 8-64 characters, include uppercase, lowercase, number, and special character."
          : "",
      });
    }

    return isEmailValid && isPasswordValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isCredentialsValid()) {
      const userFound = users.filter(
        (u) => u.userEmail === userEmail && u.userPassword === userPassword
      );

      if (Array.isArray(userFound) && userFound.length > 0) {
        setCurrentUser(userFound);
        navigate("/", { replace: true });
      } else {
        setUserNotFound(true);
      }
    } else return;
  };

  return {
    navigate,
    userEmail,
    setUserEmail,
    userPassword,
    setUserPassword,
    userNotFound,
    setUserNotFound,
    error,
    setError,
    handleSubmit,
  };
};
