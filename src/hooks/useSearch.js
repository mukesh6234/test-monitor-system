import { UserContext } from 'context/searchContext'
import { useContext } from 'react'

export const useSearch = () => useContext(UserContext)
