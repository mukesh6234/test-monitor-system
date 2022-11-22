import { useContext } from "react";

export const useAuth = () =>
  useContext({
    user: {
      id: 1,
      role: "admin",
      fullName: "John Doe",
      username: "johndoe",
      email: "admin@sneat.com",
    },
    loading: false,
  });
