import type { Vote } from '../vote/model'

export type User = {
  id: string
  ip: string
  votes: Vote[]
}

export type UserStore = {
  userSlice: {
    user: User | null
    setUser: (user: User) => void
  }
}
