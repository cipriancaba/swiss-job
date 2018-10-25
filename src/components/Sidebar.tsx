import * as React from 'react'
import { NavLink, withRouter, RouteComponentProps, Link } from 'react-router-dom'
import { AppRoute } from '../appRoutes'

interface SidebarProps {
  routes: AppRoute[]
}

class SidebarComponent extends React.PureComponent<SidebarProps & RouteComponentProps> {
  render = () => {
    console.log(this.props)
    const { routes } = this.props
    const initialRoute = routes[0]
    return (
      <>
        <Link to={initialRoute.path}>
          <h3>Front end task</h3>
        </Link>
        <ul>
          {routes.map(route => (
            <li key={route.path}>
              <NavLink to={route.path} exact={route.exact} activeClassName="selected">
                {route.sidebar()}
              </NavLink>
            </li>
          ))}
        </ul>
      </>
    )
  }
}

export const Sidebar = withRouter(SidebarComponent)
