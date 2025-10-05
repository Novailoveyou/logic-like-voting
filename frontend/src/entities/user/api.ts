import api from '@/shared/lib/api'
import type { User } from './model'
import type { USERS_KEY } from './constants'

export const userFetcher = async (key: `/${typeof USERS_KEY}/me`) => {
  const response = await api.get<User>(key)

  return response.data
}
