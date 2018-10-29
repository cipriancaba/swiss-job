import { DatasetActions, DatasetActionTypes } from '../actions/dataset.actions'
import { Product } from '../types'

export type DatasetState = Product[]

export const initialState: DatasetState = [
  {
    product: 'Apple iPhone 6s',
    color: 'Anthracite',
    price: 'CHF 769',
  },
  {
    product: 'Samsung Galaxy S8',
    color: 'Midnight Black',
    price: 'CHF 569',
  },
  {
    product: 'Huawei P9',
    color: 'Mystic Silver',
    price: 'CHF 272',
  },
]

export function dataset(state = initialState, action: DatasetActions): DatasetState {
  switch (action.type) {
    case DatasetActionTypes.UPDATE_DATASET:
      return [...action.payload]
    default:
      return state
  }
}
