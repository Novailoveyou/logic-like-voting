import { createSlice } from '@/app/store/utils'
import type { IdeaStore } from './model'

export const ideaSlice = createSlice<IdeaStore>(set => ({
  ideaSlice: {
    ideas: [],
    setIdeas: ideas =>
      set(state => {
        state.ideaSlice.ideas = ideas
      }),
    /** @remarks We intentionally don't sort ideas here based on `totalVotes` since we avoid layout shift leading to better UX */
    castVote: (ideaId, vote) =>
      set(state => {
        const ideaIndex = state.ideaSlice.ideas.findIndex(
          idea => idea.id === ideaId,
        )

        if (ideaIndex === -1) return

        state.ideaSlice.ideas[ideaIndex].totalVotes +=
          vote.myVotes - state.ideaSlice.ideas[ideaIndex].myVotes

        state.ideaSlice.ideas[ideaIndex].myVotes = vote.myVotes

        state.ideaSlice.ideas[ideaIndex].isLimit = vote.isLimit
      }),
  },
}))
