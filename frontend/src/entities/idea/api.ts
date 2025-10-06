import api from '@/shared/lib/api'
import type { Idea } from './model'
import type { IDEA_KEY } from './constants'

export const ideasFetcher = async (key: `/${typeof IDEA_KEY}`) => {
  const response = await api.get<Idea[]>(key)

  return response.data
}

export const castVoteFetcher = async (
  key: `/${typeof IDEA_KEY}/${Idea['id']}/vote`,
) => {
  const response = await api.patch<{
    value: Idea['myVotes']
    isLimit: Idea['isLimit']
  }>(key)

  return response.data
}
