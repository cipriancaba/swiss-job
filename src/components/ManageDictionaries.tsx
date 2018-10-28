import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'src/configureStore'
import { ProductMap, ValidatedProduct } from 'src/types'
import { EditableTable } from './EditableTable'

type ManageDictionariesProps = ReturnType<typeof mapStateToProps>

export class ManageDictionariesComponent extends React.PureComponent<ManageDictionariesProps> {
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

  public render = () => (
    <div>
      <h1>MANAGE DICTIONARIES</h1>
      <div>
        <EditableTable<ProductMap>
          products={this.props.products}
          isEditable={true}
          getValidatedProduct={this.getValidatedProduct}
          createNewProduct={this.createNewProduct}
          headers={['From', 'To']}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state: RootState) => {
  const transformMaps = Object.values(state.transformMap)
  return { products: transformMaps[0] }
}

export const ManageDictionaries = connect(mapStateToProps)(ManageDictionariesComponent)
