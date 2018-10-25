import * as React from 'react'
import { ManageDataset } from './components/ManageDataset'
import { ManageDictionaries } from './components/ManageDictionaries'
import { TransformDataset } from './components/TransformDataset'

export interface AppRoute {
  content: () => React.ReactElement<any>
  path: string
  exact: boolean
  sidebar: () => React.ReactNode
}

export const appRoutes: AppRoute[] = [
  {
    content: () => <TransformDataset />,
    path: '/',
    exact: true,
    sidebar: () => <span>Transform dataset</span>,
  },
  {
    content: () => <ManageDictionaries />,
    path: '/manage',
    exact: true,
    sidebar: () => <span>Manage dictionaries</span>,
  },
  {
    content: () => <ManageDataset />,
    path: '/dataset',
    exact: true,
    sidebar: () => <span>Manage dataset</span>,
  },
]
