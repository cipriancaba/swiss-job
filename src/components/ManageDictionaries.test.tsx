import { configure, shallow } from 'enzyme'
import ReactSixteenAdapter from 'enzyme-adapter-react-16'
import * as React from 'react'
import { Provider } from 'react-redux'
import { store } from '../configureStore'
import { ManageDictionaries } from './ManageDictionaries'

configure({ adapter: new ReactSixteenAdapter() })

describe('ManageDictionaries', () => {
  it('renders ManageDictionaries', () => {
    const manageDictionariesPage = shallow(
      <Provider store={store}>
        <ManageDictionaries />
      </Provider>,
      { context: { store } }
    ).dive()
    expect(manageDictionariesPage).toMatchSnapshot()
  })

  it('Creates new products', () => {
    const manageDictionariesPage = shallow(
      <Provider store={store}>
        <ManageDictionaries />
      </Provider>,
      { context: { store } }
    )
      .dive()
      .dive()
    const instance = manageDictionariesPage.instance() as any
    expect(instance.createNewProduct()).toEqual({
      from: '',
      to: '',
    })
  })

  it('Creates new validated product', () => {
    const manageDictionariesPage = shallow(
      <Provider store={store}>
        <ManageDictionaries />
      </Provider>,
      { context: { store } }
    )
      .dive()
      .dive()
    const instance = manageDictionariesPage.instance() as any
    const validatedProduct = instance.getValidatedProduct('to', 'aaa', { from: { value: '' }, to: { value: '' } }, [
      { from: { value: 'aaa', isValid: true }, to: { value: 'aaa', isValid: true } },
      { from: { value: 'bbb', isValid: true }, to: { value: 'bbb', isValid: true } },
    ])

    expect(validatedProduct).toHaveProperty('to')
    expect(validatedProduct).toHaveProperty('from')
    expect(validatedProduct).toHaveProperty('to.value', 'aaa')
    expect(validatedProduct).toHaveProperty('to.isValid', true)
    expect(validatedProduct).toHaveProperty('from.value', '')
    expect(validatedProduct).toHaveProperty('from.isValid', false)
  })

  it('Does not validate identical rows', () => {
    const manageDictionariesPage = shallow(
      <Provider store={store}>
        <ManageDictionaries />
      </Provider>,
      { context: { store } }
    )
      .dive()
      .dive()
    const instance = manageDictionariesPage.instance() as any
    const validatedProduct = instance.getValidatedProduct(
      'from',
      'aaa',
      { from: { value: '' }, to: { value: 'aaa' } },
      [
        { from: { value: 'aaa', isValid: true }, to: { value: 'aaa', isValid: true } },
        { from: { value: 'bbb', isValid: true }, to: { value: 'bbb', isValid: true } },
      ]
    )

    expect(validatedProduct).toHaveProperty('to')
    expect(validatedProduct).toHaveProperty('from')
    expect(validatedProduct).toHaveProperty('from.value', 'aaa')
    expect(validatedProduct).toHaveProperty('from.isValid', false)
    expect(validatedProduct).toHaveProperty('from.validationError', 'Duplicate rows not allowed in dictionary')
    expect(validatedProduct).toHaveProperty('to.value', 'aaa')
    expect(validatedProduct).toHaveProperty('to.isValid', false)
    expect(validatedProduct).toHaveProperty('to.validationError', 'Duplicate rows not allowed in dictionary')
  })

  it('Does not validate duplicate from columns', () => {
    const manageDictionariesPage = shallow(
      <Provider store={store}>
        <ManageDictionaries />
      </Provider>,
      { context: { store } }
    )
      .dive()
      .dive()
    const instance = manageDictionariesPage.instance() as any
    const validatedProduct = instance.getValidatedProduct(
      'from',
      'aaa',
      { from: { value: '' }, to: { value: 'bbb' } },
      [
        { from: { value: 'aaa', isValid: true }, to: { value: 'aaa', isValid: true } },
        { from: { value: 'bbb', isValid: true }, to: { value: 'bbb', isValid: true } },
      ]
    )

    expect(validatedProduct).toHaveProperty('to')
    expect(validatedProduct).toHaveProperty('from')
    expect(validatedProduct).toHaveProperty('from.value', 'aaa')
    expect(validatedProduct).toHaveProperty('from.isValid', false)
    expect(validatedProduct).toHaveProperty('from.validationError', 'Duplicate from fields not allowed in dictionary')
    expect(validatedProduct).toHaveProperty('to.value', 'bbb')
    expect(validatedProduct).toHaveProperty('to.isValid', true)
  })
})
