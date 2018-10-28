import { DictionariesActions, DictionariesActionTypes } from '../actions/dictionaries.actions'
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
  test: [
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

export function dictionaries(state = initialState, action: DictionariesActions): DictionariesState {
  switch (action.type) {
    case DictionariesActionTypes.CREATE_DICTIONARY:
      return { ...state, [action.payload]: [] }
    case DictionariesActionTypes.UPDATE_DICTIONARY:
      return { ...state, [action.payload.id]: action.payload.products }
    case DictionariesActionTypes.REMOVE_DICTIONARY:
      const { [action.payload]: removedValue, ...newState } = state
      return newState
    default:
      return state
  }
}
