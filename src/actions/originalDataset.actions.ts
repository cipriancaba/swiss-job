import { Product } from '../types'
import { ActionsUnion, createAction } from './createAction'

export enum OriginalDatasetActionTypes {
  UPDATE_DATASET = 'UPDATE_DATASET',
}

export const originalDatasetActions = {
  updateDictionary: (products: Product[]) => createAction(OriginalDatasetActionTypes.UPDATE_DATASET, products),
}

export type OriginalDatasetActions = ActionsUnion<typeof originalDatasetActions>
