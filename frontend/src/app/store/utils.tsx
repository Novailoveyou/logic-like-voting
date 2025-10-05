import type { Slice, Store } from './model'

/**
 * @description Used to create a slice for the store. Currently only used to type `slice` argument
 *
 * @example
 *
 * ```ts
 * // features/QNAs/store.ts
 * export const QNAsSlice = createSlice<QNAsStore>((set) => ({
      QNAs: {
        currentQNAId: QNAS[0].id,
        updateCurrentQNAById: (currentQNAId) =>
          set((state) => {
            state.QNAs.currentQNAId = currentQNAId
          }),
      },
    }))
 * ```
 *
 */
export const createSlice = <_Slice extends Partial<Store>>(
  slice: Slice<_Slice>,
) => slice

export const createVersion = (
  version: (string & {}) | `${number}.${number}.${number}`,
) =>
  version
    .split('.')
    .reduce((acc, cur, idx) => acc + Number(cur) * Math.pow(100, 2 - idx), 0)
