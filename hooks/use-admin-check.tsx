import { useEffect, useState } from "react";
import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";

/**
 * Custom hook to check if the current user is an admin.
 *
 * This hook uses the `useQuery` hook to fetch the current user data from the API.
 * It also manages a loading state to indicate whether the user data is still being fetched.
 *
 * @returns {Object} An object containing:
 * - `result` (boolean | undefined): A boolean indicating if the current user is an admin, or `undefined` if the user data is not yet available.
 * - `isLoading` (boolean): A boolean indicating if the user data is still being fetched.
 */
export const useAdminCheck = () => {
  const user = useQuery(api.users.current);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user !== undefined) {
      setIsLoading(false);
    }
  }, [user]);

  return { isCurrentUserAdmin: user?.isAdmin, isAdminCheckLoading: isLoading };
};
