import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import { appRoutes } from './appRoutes'
import { Sidebar } from './components/Sidebar'

class App extends React.Component {
  public render() {
    return (
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
    )
  }
}

export default App
