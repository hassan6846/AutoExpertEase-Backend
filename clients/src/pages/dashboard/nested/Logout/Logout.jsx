import React, { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import useAuth from '../../../../Hooks/useAuth'; // Ensure the path is correct

const Logout = () => {
  const [loading, setLoading] = useState(true);
  const history = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      logout();
      history.push("/login"); // Redirect to home page after logout
    }, 1500); // Set a delay of 1.5 seconds for demonstration

    return () => clearTimeout(timer); // Clear the timeout when the component unmounts
  }, [logout, history]);

  return (
    <div style={{ height: "100vh", justifyContent: "center", alignItems: "center", display: "flex" }}>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
          <CircularProgress />
          <p>Please Wait ....</p>
        </div>
      ) : null}
    </div>
  );
}

export default Logout;
