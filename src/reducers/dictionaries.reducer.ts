import { ProductMap } from '../types'

export type DictionariesState = Record<string, ProductMap[]>

export const initialState: DictionariesState = {
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

export function dictionaries(state = initialState): DictionariesState {
  // dummy reducer for now.. Added for future management of original dataset
  return initialState
}
