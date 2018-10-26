import * as React from 'react'
import { Product } from 'src/types'
import './DatasetTable.css'

export interface DatasetTableProps {
  dataset: Product[]
  isEditable: boolean
}

interface ValidatedProps {
  validation: { [P in keyof Product]: boolean }
}
type PendingProduct = Product & ValidatedProps

interface DatasetTableState {
  products: PendingProduct[]
  isEditing: boolean
}

export class DatasetTable extends React.PureComponent<DatasetTableProps, DatasetTableState> {
  private mapProductsToState = () =>
    this.props.dataset.map(product => ({
      ...product,
      validation: { product: true, price: true, color: true },
    }))

  public state = {
    products: this.mapProductsToState(),
    isEditing: false,
  }

  private addProduct = () => {
    this.setState(state => ({
      products: state.products.concat([
        { product: '', price: '', color: '', validation: { product: false, price: false, color: false } },
      ]),
    }))
  }

  private editProduct = (property: keyof Product, index: number, newValue: string) => {
    this.setState(state => {
      const editedProducts = [...state.products]
      editedProducts[index] = { ...editedProducts[index], [property]: newValue }
      editedProducts[index].validation = this.getValidationForProduct(editedProducts[index]) as {
        [P in keyof Product]: boolean
      }

      return {
        products: editedProducts,
      }
    })
  }

  private startEditing = () => {
    this.setState({ isEditing: true })
  }

  private cancelEditing = () => {
    this.setState({ isEditing: false, products: this.mapProductsToState() })
  }

  private saveProduct = () => {
    const productsValid = this.areProductsValid()
    if (productsValid) {
      // TODO - dispatch action to save new dataset
      this.setState({ isEditing: false })
    } else {
      alert('Please add valid values in fields marked with red')
    }
  }

  private getValidationForProduct = (product: PendingProduct) =>
    Object.keys(product.validation).reduce((acc, key) => ({ ...acc, [key]: !!product[key] }), {})

  private areProductsValid = () =>
    this.state.products.every(product => Object.keys(product.validation).every(key => product.validation[key]))

  private renderProductCell = (product: PendingProduct, property: keyof Product, index: number) => {
    const isValid = product.validation[property]
    return (
      <td className={isValid ? 'valid' : 'invalid'}>
        <input
          value={product[property]}
          readOnly={!this.state.isEditing}
          onChange={e => this.editProduct(property, index, e.target.value)}
        />
        {!isValid && <p>Please enter a valid string</p>}
      </td>
    )
  }

  public render() {
    const { isEditable } = this.props
    const { isEditing, products } = this.state

    return (
      <div className="DatasetTable">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Color</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                {this.renderProductCell(product, 'product', index)}
                {this.renderProductCell(product, 'color', index)}
                {this.renderProductCell(product, 'price', index)}
              </tr>
            ))}
          </tbody>
        </table>
        {isEditable && (
          <div className="EditContainer">
            {isEditing ? (
              <>
                <button type="button" onClick={this.cancelEditing}>
                  Cancel changes
                </button>
                <button type="button" onClick={this.addProduct}>
                  Add product
                </button>
                <button type="button" onClick={this.saveProduct}>
                  Save changes
                </button>
              </>
            ) : (
              <button type="button" onClick={this.startEditing}>
                Edit dataset
              </button>
            )}
          </div>
        )}
        {isEditing && <h2>EDITING MODE - Click any cell to edit</h2>}
      </div>
    )
  }
}
