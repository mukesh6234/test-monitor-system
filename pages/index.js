// ** React Imports
import { useEffect } from "react";

// ** Next Imports
import { useRouter } from "next/router";

// ** Spinner Import
import Spinner from "../src/@core/components/spinner";
import { useAuth } from "hooks/useAuth";


// ** Hook Imports


/**
 *  Set Home URL based on User Roles
 */
export const getHomeRoute = (role) => {
  if (role === "client") return "/acl";
  else return "/projects";
};

const Home = () => {
  // ** Hooks
  const auth = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (auth.user && auth.user.role_group) {
      console.log("11111111111",auth.user.role_group);
      const homeRoute = getHomeRoute(auth.user.role_group.name);
      router.replace(homeRoute);
    } else {
      console.log("11111111111");
    }
  }, []);

  return <Spinner sx={{ height: "100%" }} />;
};

export default Home;
