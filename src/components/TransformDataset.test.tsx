import { configure, shallow } from 'enzyme'
import ReactSixteenAdapter from 'enzyme-adapter-react-16'
import * as React from 'react'
import { Provider } from 'react-redux'
import { store } from '../configureStore'
import { TransformDataset } from './TransformDataset'

configure({ adapter: new ReactSixteenAdapter() })

describe('TransformDataset', () => {
  it('renders TransformDataset', () => {
    const transformPage = shallow(
      <Provider store={store}>
        <TransformDataset />
      </Provider>,
      { context: { store } }
    ).dive()
    expect(transformPage).toMatchSnapshot()
  })
})
