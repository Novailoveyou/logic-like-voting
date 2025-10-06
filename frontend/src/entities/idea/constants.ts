import type { IdeaStore } from './model'

export const IDEA_KEY = 'ideas'

export const LOADING_IDEA_SKELETONS = [
  {
    id: 'e3342a1b-0812-42e7-a994-8176f9405a6b',
    title: '',
    description: '',
    myVotes: 0,
    totalVotes: 0,
    isLimit: true,
  },
  {
    id: '5cfb504c-64c8-417d-8b56-3c6e96c510f6',
    title: '',
    description: '',
    myVotes: 0,
    totalVotes: 0,
    isLimit: true,
  },
  {
    id: 'd21c1586-51f8-4cd9-97cf-06b7bb3b594b',
    title: '',
    description: '',
    myVotes: 0,
    totalVotes: 0,
    isLimit: true,
  },
] as const satisfies IdeaStore['ideaSlice']['ideas']
