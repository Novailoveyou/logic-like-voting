import type { StateCreator } from 'zustand/vanilla'
import type { IdeaStore } from '@/entities/idea/model'

export type Store = IdeaStore

type ZustandMiddleware = [['zustand/devtools', never], ['zustand/immer', never]]

export type Slice<T> = StateCreator<Store, ZustandMiddleware, [], T>
