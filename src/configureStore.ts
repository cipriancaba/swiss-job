import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistCombineReducers, PersistedState, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import { originalDataset, OriginalDatasetState } from './reducers/originalDataset.reducer'
import { transformMap, TransformMapState } from './reducers/transformMap.reducer'
import { rootSagas } from './sagas'

export interface RootState extends PersistedState {
  originalDataset: OriginalDatasetState
  transformMap: TransformMapState
}

const initialState: Partial<RootState> = {}
const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]
const middleware = applyMiddleware(...middlewares)

const config = {
  key: 'root',
  storage,
  version: 1,
  whitelist: ['originalDataset', 'transformMap'],
}

const reducersWithPersist = persistCombineReducers(config, { originalDataset, transformMap })
const store = createStore(reducersWithPersist, initialState, composeWithDevTools(middleware))

const persistor = persistStore(store)
// persistor.purge()

sagaMiddleware.run(rootSagas)

export { store, persistor }
