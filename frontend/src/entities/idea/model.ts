import type { User } from '../user/model'
import type { Vote } from '../vote/model'

export type Idea = {
  id: string
  title: string
  description: string
  votes: Vote[]
}

export type IdeaStore = {
  ideaSlice: {
    ideas: Record<Idea['id'], Idea> | null
    setIdeas: (ideas: Idea[]) => void
    vote: (ideaId: Idea['id'], userIp: User['ip']) => void
  }
}
