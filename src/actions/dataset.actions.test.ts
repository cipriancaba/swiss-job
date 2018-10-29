import { dataset, initialState } from '../reducers/dataset.reducer'
import { datasetActions, DatasetActionTypes } from './dataset.actions'

describe('Dataset', () => {
  it('creates the action correctly', () => {
    expect(datasetActions.updateDictionary([])).toEqual({ type: DatasetActionTypes.UPDATE_DATASET, payload: [] })
  })

  it('initialises the reducer with the initial state', () => {
    expect(dataset(undefined, { type: 'init' } as any)).toEqual(initialState)
  })

  it('handles the UPDATE_DATASET action in the reducer with empty payload', () => {
    const action = datasetActions.updateDictionary([])
    expect(dataset(undefined, action)).toEqual([])
  })

  it('handles the UPDATE_DATASET action in the reducer', () => {
    const actionWithData = datasetActions.updateDictionary([
      {
        product: 'Apple iPhone 6s',
        color: 'Anthracite',
        price: 'CHF 769',
      },
    ])
    expect(dataset(undefined, actionWithData)).toEqual(actionWithData.payload)
  })
})
