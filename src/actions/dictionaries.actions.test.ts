import { dictionaries, initialState } from '../reducers/dictionaries.reducer'
import { dictionariesActions, DictionariesActionTypes } from './dictionaries.actions'

describe('Dictionary', () => {
  it('creates the CREATE_DICTIONARY action correctly', () => {
    expect(dictionariesActions.createDictionary('test')).toEqual({
      type: DictionariesActionTypes.CREATE_DICTIONARY,
      payload: 'test',
    })
  })

  it('creates the UPDATE_DICTIONARY action correctly', () => {
    expect(dictionariesActions.updateDictionary('test', [])).toEqual({
      type: DictionariesActionTypes.UPDATE_DICTIONARY,
      payload: { id: 'test', products: [] },
    })
  })

  it('creates the REMOVE_DICTIONARY action correctly', () => {
    expect(dictionariesActions.removeDictionary('test')).toEqual({
      type: DictionariesActionTypes.REMOVE_DICTIONARY,
      payload: 'test',
    })
  })

  it('initialises the reducer with the initialState', () => {
    expect(dictionaries(undefined, { type: 'init' } as any)).toEqual(initialState)
  })

  it('handles the CREATE_DICTIONARY action in the reducer', () => {
    const action = dictionariesActions.createDictionary('test')
    expect(dictionaries(undefined, action)).toHaveProperty('test', [])
  })

  it('handles the UPDATE_DICTIONARY action in the reducer without removing other dictionaries', () => {
    const initAction = { type: 'init' } as any
    let state = dictionaries(undefined, initAction)
    state = dictionaries(state, dictionariesActions.createDictionary('test'))
    const updateAction = dictionariesActions.updateDictionary('test', [{ from: 'Black', to: 'Blue' }])
    state = dictionaries(state, updateAction)
    expect(state).toHaveProperty('test', [{ from: 'Black', to: 'Blue' }])
    Object.keys(initialState).forEach(key => {
      expect(state).toHaveProperty(key, initialState[key])
    })
  })

  it('handles the REMOVE_DICTIONARY action in the reducer', () => {
    const initAction = { type: 'init' } as any
    let state = dictionaries(undefined, initAction)
    state = dictionaries(state, dictionariesActions.createDictionary('test'))
    const updateAction = dictionariesActions.updateDictionary('test', [{ from: 'Black', to: 'Blue' }])
    state = dictionaries(state, updateAction)
    const removeAction = dictionariesActions.removeDictionary('test')
    state = dictionaries(state, removeAction)
    expect(state).toEqual(initialState)
  })
})
