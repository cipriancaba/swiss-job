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
    exact: true,
    path: '/',
    sidebar: () => <span>Transform dataset</span>,
  },
  {
    content: () => <ManageDictionaries />,
    exact: true,
    path: '/manage',
    sidebar: () => <span>Manage dictionaries</span>,
  },
  {
    content: () => <ManageDataset />,
    exact: true,
    path: '/dataset',
    sidebar: () => <span>Manage dataset</span>,
  },
]
