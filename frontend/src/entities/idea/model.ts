export type Vote = {
  id: string
  value: number
  userIp: string
}

export type Idea = {
  id: string
  title: string
  description: string
  votes: Vote[]
}

export type IdeaStore = {
  ideaSlice: {
    ideas: Idea[]
    setIdeas: (ideas: Idea[]) => void
    castVote: (idea: Idea) => void
  }
}
