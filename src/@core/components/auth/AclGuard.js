// ** React Imports
import { useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Context Imports
import { AbilityContext } from '../../../layouts/components/acl/Can'

// ** Config Import
import { buildAbilityFor } from '../../../configs/acl'

// ** Component Import
import NotAuthorized from '../../../../pages/401'
import BlankLayout from '../../../@core/layouts/BlankLayout'

// ** Hooks
import { useAuth } from '../../../hooks/useAuth'

const AclGuard = props => {
  // ** Props
  const { aclAbilities, children, guestGuard } = props
  const [ability, setAbility] = useState(undefined)
  const auth = useAuth()
  
  const router = useRouter()

  // If guestGuard is true and user is not logged in or its an error page, render the page without checking access
  if (guestGuard || router.route === '/404' || router.route === '/500' || router.route === '/') {
    return <>{children}</>
  }

  // User is logged in, build ability for the user based on his role
  if (auth.user && auth.user.role_group && !ability) {
    setAbility(buildAbilityFor(auth.user.role_group.name, aclAbilities.subject))
  }

  // Check the access of current user and render pages
  if (ability && ability.can(aclAbilities.action, aclAbilities.subject)) {

    return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  }

  // Render Not Authorized component if the current user has limited access
  return (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  )
}

export default AclGuard
