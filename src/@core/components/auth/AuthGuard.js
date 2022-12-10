// ** React Imports
import { useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Hooks Import
import { useAuth } from "../../../hooks/useAuth";
import authConfig from "configs/auth"

const AuthGuard = props => {
  const { children, fallback } = props
  const auth = useAuth();
  const router = useRouter()
  
  useEffect(
    () => {
      if (!router.isReady) {
        return
      }

    },
    [router.route]
  )
  if (auth.loading || auth.user === null) {
    router.replace("/login");
    window.localStorage.removeItem("userData");
    window.localStorage.removeItem(authConfig.storageTokenKeyName);

    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
