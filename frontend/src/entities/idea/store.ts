import { createSlice } from '@/app/store/utils'
import type { IdeaStore } from './model'

export const ideaSlice = createSlice<IdeaStore>(set => ({
  ideaSlice: {
    ideas: [],
    setIdeas: ideas =>
      set(state => {
        state.ideaSlice.ideas = ideas
      }),
    castVote: idea =>
      set(state => {
        state.ideaSlice.ideas.forEach((ideaItem, idx) => {
          if (ideaItem.id === idea.id) state.ideaSlice.ideas[idx] = idea
        })
      }),
  },
}))
