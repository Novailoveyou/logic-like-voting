export type User = {
  ip: string
}

export type UserStore = {
  userSlice: {
    user: User | null
    setUser: (user: User) => void
  }
}
