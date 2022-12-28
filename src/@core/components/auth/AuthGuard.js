// ** React Imports
import { useEffect } from "react";

// ** Next Imports
import { useRouter } from "next/router";

// ** Hooks Import
import { useAuth } from "../../../hooks/useAuth";
// import authConfig from "configs/auth"

const AuthGuard = (props) => {
  const { children, fallback } = props;
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    
    if (!window.localStorage.getItem("userData")) {
      if (router.asPath !== "/projects") {
        router.replace({
          pathname: "/login",
          query: { returnUrl: router.asPath },
        });
      } else {
        router.replace("/login");
      }
    }
  }, [router.route]);
  if (auth.loading || auth.user === null) {
    return fallback;
  }

  return <>{children}</>;
};

export default AuthGuard;
