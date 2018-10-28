import { ProductMap } from '../types'
import { ActionsUnion, createAction } from './createAction'

export enum DictionariesActionTypes {
  CREATE_DICTIONARY = 'CREATE_DICTIONARY',
  REMOVE_DICTIONARY = 'REMOVE_DICTIONARY',
  UPDATE_DICTIONARY = 'UPDATE_DICTIONARY',
}

export const dictionariesActions = {
  createDictionary: (id: string) => createAction(DictionariesActionTypes.CREATE_DICTIONARY, id),
  updateDictionary: (id: string, products: ProductMap[]) =>
    createAction(DictionariesActionTypes.UPDATE_DICTIONARY, { id, products }),
  removeDictionary: (id: string) => createAction(DictionariesActionTypes.REMOVE_DICTIONARY, id),
}

export type DictionariesActions = ActionsUnion<typeof dictionariesActions>
