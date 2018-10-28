import * as React from 'react'
import { Link, NavLink, RouteComponentProps, withRouter } from 'react-router-dom'
import { AppRoute } from '../appRoutes'

interface SidebarProps {
  routes: AppRoute[]
}

class SidebarComponent extends React.PureComponent<SidebarProps & RouteComponentProps> {
  public render = () => {
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
