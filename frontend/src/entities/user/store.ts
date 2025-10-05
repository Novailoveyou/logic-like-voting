import { createSlice } from '@/app/store/utils'
import type { UserStore } from './model'

export const userSlice = createSlice<UserStore>(set => ({
  userSlice: {
    user: null,
    setUser: user =>
      set(state => {
        state.userSlice.user = user
      }),
  },
}))
