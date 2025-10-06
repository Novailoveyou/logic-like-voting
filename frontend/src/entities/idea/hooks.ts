'use client'

// import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'
import { castVoteFetcher, ideasFetcher } from './api'
import { IDEA_KEY } from './constants'
import { useStore } from '@/app/store'
import type { Idea } from './model'
import useSWRMutation from 'swr/mutation'
import { toast } from 'sonner'

export const useIdeas = () => {
  const setIdeas = useStore(state => state.ideaSlice.setIdeas)

  const {
    error: ideasError,
    isLoading: areIdeasAreLoading,
    isValidating: areIdeasValidating,
  } = useSWR(`/${IDEA_KEY}`, ideasFetcher, {
    onSuccess: setIdeas,
  })

  return {
    ideasError,
    areIdeasAreLoading,
    areIdeasValidating,
  }
}

export const useCastVote = (ideaId: Idea['id']) => {
  const castVote = useStore(state => state.ideaSlice.castVote)

  const {
    error: castVoteError,
    isMutating: isCastVoteMutating,
    reset: resetCastVote,
    trigger: triggerCastVote,
  } = useSWRMutation(`/${IDEA_KEY}/${ideaId}/vote`, castVoteFetcher, {
    optimisticData: vote => ({
      value: (vote?.value || 0) + 1,
      isLimit: vote?.isLimit || false,
    }),
    onSuccess: vote => {
      castVote(ideaId, { myVotes: vote.value, isLimit: vote.isLimit })
      toast.dismiss('8ef9b5b4-824c-4a52-aa43-61092a3908d9')
    },
    onError: data => {
      const error = data instanceof Error ? data : new Error(data)

      // TODO: translate errors
      toast(error.message, {
        id: '8ef9b5b4-824c-4a52-aa43-61092a3908d9',
        duration: 3000,
        dismissible: true,
        description: error.name,
      })
    },
  })

  return {
    castVoteError,
    isCastVoteMutating,
    resetCastVote,
    triggerCastVote,
  }
}
