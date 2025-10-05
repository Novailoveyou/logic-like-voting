import { createStore as createZustandVanillaStore } from 'zustand/vanilla'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { Store } from './model'
import { ideaSlice } from '@/entities/idea/store'
import { userSlice } from '@/entities/user/store'

export const createStore = () => {
  return createZustandVanillaStore<Store>()(
    devtools(
      immer((...props) => ({
        ...ideaSlice(...props),
        ...userSlice(...props),
      })),
    ),
  )
}
