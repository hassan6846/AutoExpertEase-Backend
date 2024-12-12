// useAuth.js
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders"; // Ensure this path is correct

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
