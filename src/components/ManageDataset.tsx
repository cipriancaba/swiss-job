import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { datasetActions } from '../actions/dataset.actions'
import { RootState } from '../configureStore'
import { Product, ValidatedProduct } from '../types'
import { EditableTable } from './EditableTable'

type ManageDatasetProps = ReturnType<typeof mapStateToProps> & DispatchProp

class ManageDatasetComponent extends React.PureComponent<ManageDatasetProps> {
  private getValidatedProduct = (
    property: keyof Product,
    newValue: string,
    product: ValidatedProduct<Product>,
    products: Array<ValidatedProduct<Product>>
  ) => {
    const newProduct = {
      ...product,
      [property]: {
        value: newValue,
        isValid: !!newValue,
        validationError: newValue === '' ? 'Please enter a value' : undefined,
      },
    }
    return newProduct
  }

  private createNewProduct = () => ({
    product: '',
    color: '',
    price: '',
  })

  private onUpdateData = (products: Array<ValidatedProduct<Product>>) => {
    this.props.dispatch(
      datasetActions.updateDictionary(
        products.map(p => ({ product: p.product.value, color: p.color.value, price: p.price.value }))
      )
    )
  }

  public render = () => {
    return (
      <div className="ManageDataset">
        <h1>MANAGE DATASET</h1>
        <div>
          <EditableTable<Product>
            products={this.props.products}
            getValidatedProduct={this.getValidatedProduct}
            createNewProduct={this.createNewProduct}
            headers={['Product', 'Color', 'Price']}
            onUpdateData={this.onUpdateData}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  return { products: state.dataset }
}

export const ManageDataset = connect(mapStateToProps)(ManageDatasetComponent)
