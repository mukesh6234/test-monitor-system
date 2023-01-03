// ** React Imports
import { useEffect } from "react";

// ** Next Imports
import { useRouter } from "next/router";

// ** Spinner Import
import Spinner from "../src/@core/components/spinner";
import { useAuth } from "hooks/useAuth";

const Home = () => {

  // ** Hooks
  const auth = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (auth.user) {
      router.replace("/projects");
    } else {
      router.replace("/login");
    }
  }, []);

  return <Spinner sx={{ height: "100%" }} />;
};

export default Home;
