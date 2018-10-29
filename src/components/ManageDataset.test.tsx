import { configure, shallow } from 'enzyme'
import ReactSixteenAdapter from 'enzyme-adapter-react-16'
import * as React from 'react'
import { Provider } from 'react-redux'
import { store } from '../configureStore'
import { ManageDataset } from './ManageDataset'

configure({ adapter: new ReactSixteenAdapter() })

describe('ManageDataset', () => {
  it('renders ManageDataset', () => {
    const manageDatasetPage = shallow(
      <Provider store={store}>
        <ManageDataset />
      </Provider>,
      { context: { store } }
    ).dive()
    expect(manageDatasetPage).toMatchSnapshot()
  })
})
