import { configure, shallow } from 'enzyme'
import ReactSixteenAdapter from 'enzyme-adapter-react-16'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'

configure({ adapter: new ReactSixteenAdapter() })

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('renders App', () => {
    const app = shallow(<App />)
    expect(app).toMatchSnapshot()
  })
})
