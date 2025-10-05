import { createSlice } from '@/app/store/utils'
import type { IdeaStore } from './model'

export const ideaSlice = createSlice<IdeaStore>(set => ({
  ideaSlice: {
    ideas: null,
    setIdeas: ideas =>
      set(state => {
        if (!state.ideaSlice.ideas && ideas.length > 0)
          state.ideaSlice.ideas = {}

        if (state.ideaSlice.ideas)
          ideas.forEach(idea => {
            state.ideaSlice.ideas![idea.id] = idea
          })
      }),
    vote: (ideaId, userIp) =>
      set(state => {
        if (!state.ideaSlice.ideas) return

        state.ideaSlice.ideas[ideaId].votes.forEach(vote => {
          if (vote.userIp === userIp) vote.value++
        })
      }),
  },
}))
