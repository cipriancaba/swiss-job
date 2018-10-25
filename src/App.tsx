import * as React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import './App.css'
import { appRoutes } from './appRoutes'
import { Sidebar } from './components/Sidebar'
import { persistor, store } from './configureStore'

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<div />} persistor={persistor}>
          <Router>
            <div className="App">
              <div className="Sidebar">
                <Sidebar routes={appRoutes} />
              </div>

              <div className="Content">
                {appRoutes.map(route => (
                  <Route key={route.path} exact={route.exact} path={route.path} component={route.content} />
                ))}
              </div>
            </div>
          </Router>
        </PersistGate>
      </Provider>
    )
  }
}

export default App
