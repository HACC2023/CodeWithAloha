
import React, { useState, useEffect } from "react";


const LoginButton: React.FC = () => {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    window.location.reload(); // or navigate to the login page
  };

  const handleClick = userRole ? handleLogout : () => {};

  return (
    <button
      onClick={handleClick}
      className="text-white hover:bg-gray-700 py-2 px-4 rounded"
    >
      {userRole ? "Logout" : "Login"}
    </button>
  );
};

export default LoginButton;
