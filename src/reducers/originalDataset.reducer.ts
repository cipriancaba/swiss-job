import { Product } from '../types'

export type OriginalDatasetState = Product[]

export const initialState: OriginalDatasetState = [
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

export function originalDataset(state = initialState): OriginalDatasetState {
  // dummy reducer for now.. Added for future management of original dataset
  return initialState
}
