import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { dictionariesActions } from '../actions/dictionaries.actions'
import { RootState } from '../configureStore'
import { ProductMap, ValidatedProduct } from '../types'
import { EditableTable } from './EditableTable'
import './ManageDictionaries.css'

type ManageDictionariesProps = ReturnType<typeof mapStateToProps> & DispatchProp

interface ManageDictionariesState {
  newDictionaryName?: string
}

export class ManageDictionariesComponent extends React.PureComponent<ManageDictionariesProps, ManageDictionariesState> {
  public state = {
    newDictionaryName: '',
  }

  private getValidatedProduct = (
    property: keyof ProductMap,
    newValue: string,
    product: ValidatedProduct<ProductMap>,
    products: Array<ValidatedProduct<ProductMap>>
  ) => {
    const newProduct = { ...product, [property]: { value: newValue } }

    let isValid = true
    let validationError

    if (newValue === '') {
      isValid = false
      validationError = 'Please enter a value'
    } else if (
      products.some(
        existingProduct =>
          existingProduct.from.value === newProduct.from.value && existingProduct.to.value === newProduct.to.value
      )
    ) {
      // Clones: N identical rows in the dictionary.
      isValid = false
      validationError = 'Duplicate rows not allowed in dictionary'
    } else if (products.some(existingProduct => existingProduct.from.value === newProduct.from.value)) {
      // Forks: N rows in the dictionary with the same ‘From’ but with different ‘To’’ .
      isValid = false
      validationError = 'Duplicate from fields not allowed in dictionary'
    }

    newProduct[property].isValid = isValid
    newProduct[property].validationError = validationError

    return newProduct
  }

  private createNewProduct = () => ({
    from: '',
    to: '',
  })

  private createNewDictionary = () => {
    if (this.state.newDictionaryName) {
      this.props.dispatch(dictionariesActions.createDictionary(this.state.newDictionaryName))
      this.setState({ newDictionaryName: '' })
    } else {
      alert('Please add a name for your dictionary')
    }
  }

  private removeDictionary = (id: string) => {
    this.props.dispatch(dictionariesActions.removeDictionary(id))
  }

  private onChangeDictionaryName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newDictionaryName: e.currentTarget.value,
    })
  }

  private onUpdateData = (id: string, products: Array<ValidatedProduct<ProductMap>>) => {
    this.props.dispatch(
      dictionariesActions.updateDictionary(
        id,
        products.map(product => ({ from: product.from.value, to: product.to.value }))
      )
    )
  }

  public render = () => (
    <div className="ManageDictionaries">
      <h1>MANAGE DICTIONARIES</h1>
      <div className="AddDictionary">
        <input value={this.state.newDictionaryName} onChange={this.onChangeDictionaryName} />
        <button type="button" onClick={this.createNewDictionary}>
          ADD NEW DICTIONARY
        </button>
      </div>
      <div>
        {Object.keys(this.props.dictionaries)
          .reverse()
          .map(id => (
            <div className="Dictionary" key={id}>
              <div className="Header">
                <h2>Dictionary {id}</h2>
                <button type="button" onClick={() => this.removeDictionary(id)}>
                  REMOVE
                </button>
              </div>
              <EditableTable<ProductMap>
                products={this.props.dictionaries[id]}
                getValidatedProduct={this.getValidatedProduct}
                createNewProduct={this.createNewProduct}
                headers={['From', 'To']}
                onUpdateData={products => this.onUpdateData(id, products)}
              />
            </div>
          ))}
      </div>
    </div>
  )
}

const mapStateToProps = (state: RootState) => {
  return { dictionaries: state.dictionaries }
}

export const ManageDictionaries = connect(mapStateToProps)(ManageDictionariesComponent)
