import api from '@/shared/lib/api'
import type { Idea } from './model'
import type { IDEA_KEY } from './constants'

export const ideasFetcher = async (key: `/${typeof IDEA_KEY}`) => {
  const response = await api.get<Idea[]>(key)

  return response.data
}

export const voteIdeaFether = async (
  key: `/${typeof IDEA_KEY}/${Idea['id']}/vote`,
) => {
  const response = await api.post<Idea>(key)

  return response.data
}

// export const createRoundFetcher = async (key: string) => {
//   const response = await api.post<IdeaStore['round']['rounds'][number]>(
//     key,
//     undefined,
//     {
//       headers: {
//         Authorization: `Bearer ${getCookie('token')}`,
//       },
//     },
//   )

//   return response.data
// }

// export const roundFetcher = async (key: string) => {
//   const response = await api.get<IdeaStore['round']['round']>(key, {
//     headers: {
//       Authorization: `Bearer ${getCookie('token')}`,
//     },
//   })

//   return response.data
// }
