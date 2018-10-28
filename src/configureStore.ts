import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistCombineReducers, PersistedState, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import { dictionaries, DictionariesState } from './reducers/dictionaries.reducer'
import { originalDataset, OriginalDatasetState } from './reducers/originalDataset.reducer'
import { rootSagas } from './sagas'

export interface RootState extends PersistedState {
  originalDataset: OriginalDatasetState
  dictionaries: DictionariesState
}

const initialState: Partial<RootState> = {}
const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]
const middleware = applyMiddleware(...middlewares)

const config = {
  key: 'root',
  storage,
  version: 1,
  whitelist: ['originalDataset', 'dictionaries'],
}

const reducersWithPersist = persistCombineReducers(config, { originalDataset, dictionaries })
const store = createStore(reducersWithPersist, initialState, composeWithDevTools(middleware))

const persistor = persistStore(store)
persistor.purge()

sagaMiddleware.run(rootSagas)

export { store, persistor }
