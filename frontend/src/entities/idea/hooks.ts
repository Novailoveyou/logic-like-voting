'use client'

// import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { ideasFetcher, voteIdeaFether } from './api'
import { IDEA_KEY } from './constants'
import { useStore } from '@/app/store'
import type { Idea } from './model'

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

export const useVote = (ideaId: Idea['id']) => {
  const castVote = useStore(state => state.ideaSlice.castVote)

  const {
    data: vote = null,
    isMutating: voteIsMutating,
    error: voteError,
    reset: resetVote,
    trigger: triggerCastVote,
  } = useSWRMutation(
    ideaId ? `/${IDEA_KEY}/${ideaId}/vote` : null,
    voteIdeaFether,
    {
      onSuccess: castVote,
    },
  )

  return {
    vote,
    voteIsMutating,
    voteError,
    resetVote,
    triggerCastVote,
  }
}
