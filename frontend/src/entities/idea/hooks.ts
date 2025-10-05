'use client'

// import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'
import { ideasFetcher } from './api'
import { IDEA_KEY } from './constants'
import { useStore } from '@/app/store'

export const useIdeas = () => {
  const setIdeas = useStore(state => state.ideaSlice.setIdeas)

  const {
    data: ideas = null,
    error: ideasError,
    isLoading: ideasAreLoading,
    isValidating: ideasAreValidating,
    mutate: mutateIdeas,
  } = useSWR(`/${IDEA_KEY}`, ideasFetcher, {
    onSuccess: setIdeas,
  })

  return {
    ideas,
    ideasError,
    ideasAreLoading,
    ideasAreValidating,
    mutateIdeas,
  }
}

// export const useCreateRound = () => {
//   const addRound = useStore(state => state.round.addRound)

//   const {
//     data: round = null,
//     error: roundError,
//     isMutating: roundIsMutating,
//     reset: resetRound,
//     trigger: triggerRound,
//   } = useSWRMutation(IDEA_KEY, createRoundFetcher, {
//     onSuccess: addRound,
//   })

//   return {
//     round,
//     roundError,
//     roundIsMutating,
//     resetRound,
//     triggerRound,
//   }
// }

// export const useRound = (id?: string) => {
//   const setRound = useStore(state => state.round.setRound)

//   const {
//     data: round = null,
//     error: roundError,
//     isLoading: roundIsLoading,
//     isValidating: roundIsValidating,
//     mutate: mutateRound,
//   } = useSWR(id ? `${IDEA_KEY}/${id}` : null, roundFetcher, {
//     onSuccess: setRound,
//     refreshInterval: 10000,
//   })

//   return {
//     round,
//     roundError,
//     roundIsLoading,
//     roundIsValidating,
//     mutateRound,
//   }
// }
