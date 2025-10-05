'use client'

// import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'
import { userFetcher } from './api'
import { USERS_KEY } from './constants'
import { useStore } from '@/app/store'

export const useUser = () => {
  const setUser = useStore(state => state.userSlice.setUser)

  const {
    data: user = null,
    error: userError,
    isLoading: userIsLoading,
    isValidating: userIsValidating,
    mutate: mutateUser,
  } = useSWR(`/${USERS_KEY}/me`, userFetcher, {
    onSuccess: setUser,
  })

  return {
    user,
    userError,
    userIsLoading,
    userIsValidating,
    mutateUser,
  }
}
