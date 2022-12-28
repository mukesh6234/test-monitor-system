// ** React ImportsuserLogin
import { createContext, useEffect, useState } from "react";
import { userLogin, userProfile } from "../../pages/api/authentication";

// ** Next Import
import { useRouter } from "next/router";

// ** Config
import authConfig from "../configs/auth";
import { errorHandler } from "components/helper/errorHandling";

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
};
const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user);
  const [loading, setLoading] = useState(defaultProvider.loading);

  // ** Hooks
  const router = useRouter();
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(
        authConfig.storageTokenKeyName
      );
      if (storedToken) {
        setLoading(true);
        await userProfile(storedToken)
          .then(({ data }) => {
            setLoading(false);
            setUser(data);
          })
          .catch(() => {
            localStorage.removeItem("accessToken");
            setUser(null);
            setLoading(false);
            router.replace("/login");
          });
        defaultProvider;
      } else {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const handleLogin = (params, errorCallback) => {
    let login = { user_name: params.email, password: params.password };
    userLogin(login)
      .then(({ data }) => {
        setUser(data);
        window.localStorage.setItem(
          authConfig.storageTokenKeyName,
          data?.auth_token
        );
        window.localStorage.setItem("userData", JSON.stringify(data));
        const returnUrl = router.query.returnUrl;
        const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : "/";
        router.replace(redirectURL);
        setLoading(false);
      })
      .catch((err) => {
        if (errorCallback) errorCallback(err);
        errorHandler(err);
      });
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("userData");
    window.localStorage.removeItem(authConfig.storageTokenKeyName);
    router.push("/login");
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
