export type Idea = {
  id: string
  title: string
  description: string
  totalVotes: number
  myVotes: number
  isLimit: boolean
}

export type IdeaStore = {
  ideaSlice: {
    ideas: Idea[]
    setIdeas: (ideas: IdeaStore['ideaSlice']['ideas']) => void
    castVote: (
      ideaId: Idea['id'],
      vote: Pick<Idea, 'myVotes' | 'isLimit'>,
    ) => void
  }
}
