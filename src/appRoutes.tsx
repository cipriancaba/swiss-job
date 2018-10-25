import * as React from 'react'

export interface AppRoute {
  content: () => React.ReactElement<any>
  path: string
  exact: boolean
  sidebar: () => React.ReactNode
}

export const appRoutes: AppRoute[] = [
  {
    content: () => <h2>Transform dataset</h2>,
    path: '/',
    exact: true,
    sidebar: () => <span>Transform dataset</span>,
  },
  {
    content: () => <h2>Manage dictionaries</h2>,
    path: '/manage',
    exact: true,
    sidebar: () => <span>Manage dictionaries</span>,
  },
  {
    content: () => <h2>Manage dataset</h2>,
    path: '/dataset',
    exact: true,
    sidebar: () => <span>Manage dataset</span>,
  },
]
