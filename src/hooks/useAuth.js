import { useState, useEffect } from "react";

// Custom hook to check if user is authenticated and manage user details
const useAuth = () => {
  // Initialize state with user details from localStorage or null if not found
  const [userDetails, setUserDetails] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  // Method to check if user has a specific role
  const hasRole = (role) => {
    return userDetails?.role === role;
  };

  // Update userDetails in state when localStorage changes
  // This is useful if you have multiple tabs open and log out in one of them
  useEffect(() => {
    const handleStorageChange = () => {
      const user = localStorage.getItem("user");
      setUserDetails(user ? JSON.parse(user) : null);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Check if user is authenticated based on the presence of userDetails
  const isAuthenticated = !!userDetails;

  return { isAuthenticated, userDetails, hasRole };
};

export default useAuth;
