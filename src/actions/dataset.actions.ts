import { Product } from '../types'
import { ActionsUnion, createAction } from './createAction'

export enum DatasetActionTypes {
  UPDATE_DATASET = 'UPDATE_DATASET',
}

export const datasetActions = {
  updateDictionary: (products: Product[]) => createAction(DatasetActionTypes.UPDATE_DATASET, products),
}

export type DatasetActions = ActionsUnion<typeof datasetActions>
