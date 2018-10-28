import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../configureStore'
import { Product, ValidatedProduct } from '../types'
import { EditableTable } from './EditableTable'

type ManageDatasetProps = ReturnType<typeof mapStateToProps>

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
    console.log('update data')
  }

  public render = () => {
    return (
      <div>
        <h1>MANAGE DATASET</h1>
        <div>
          <EditableTable<Product>
            products={this.props.products}
            isEditable={true}
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
  return { products: state.originalDataset }
}

export const ManageDataset = connect(mapStateToProps)(ManageDatasetComponent)
