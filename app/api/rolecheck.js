import { useEffect } from "react";
import { useRouter } from "next/router";

const useRoleCheck = (requiredRole) => {
  const router = useRouter();

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");

    // If the user's role doesn't match the required role, redirect or handle as needed
    if (userRole !== requiredRole) {
      router.push("/login"); // Redirect to login or another appropriate page
    }
  }, [requiredRole, router]);

  return userRole === requiredRole;
};

export default useRoleCheck;
