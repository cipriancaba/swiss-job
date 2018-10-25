import { ProductMap } from '../types'

export type TransformMapState = Record<string, ProductMap[]>

export const initialState: TransformMapState = {
  default: [
    {
      from: 'Anthracite',
      to: 'Dark Grey',
    },
    {
      from: 'Midnight Black',
      to: 'Black',
    },
    {
      from: 'Mystic Silver',
      to: 'Silver',
    },
  ],
}

export function transformMap(state = initialState): TransformMapState {
  // dummy reducer for now.. Added for future management of original dataset
  return initialState
}
