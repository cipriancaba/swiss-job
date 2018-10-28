import * as React from 'react'
import { ValidatedProduct } from '../types'
import './EditableTable.css'

export interface EditableTableProps<P> {
  products: P[]
  isEditable: boolean
  getValidatedProduct: (
    property: keyof P,
    newValue: string,
    product: ValidatedProduct<P>,
    products: Array<ValidatedProduct<P>>
  ) => ValidatedProduct<P>
  createNewProduct: () => P
  headers: string[]
  onUpdateData: (products: Array<ValidatedProduct<P>>) => void
}

interface EditableTableState<P> {
  pendingData: Array<ValidatedProduct<P>>
  isEditing: boolean
}

export class EditableTable<P> extends React.PureComponent<EditableTableProps<P>, EditableTableState<P>> {
  private mapProductToValidatedProduct = (product: P, isValid: boolean, validationError?: string) =>
    Object.keys(product).reduce(
      (acc, key) => ({
        ...acc,
        [key]: {
          value: product[key],
          isValid,
          validationError,
        },
      }),
      {}
    ) as ValidatedProduct<P>

  private mapDataToState = () => this.props.products.map(product => this.mapProductToValidatedProduct(product, true))

  public state = {
    pendingData: this.mapDataToState(),
    isEditing: false,
  }

  private addProduct = () => {
    this.setState(state => ({
      pendingData: state.pendingData.concat([
        this.mapProductToValidatedProduct(this.props.createNewProduct(), false, 'Please enter a value'),
      ]),
    }))
  }

  private editProduct = (property: keyof P, index: number, newValue: string) => {
    this.setState(state => {
      const pendingData = [...state.pendingData]
      pendingData[index] = this.props.getValidatedProduct(
        property,
        newValue,
        pendingData[index],
        pendingData.filter(d => d !== pendingData[index])
      )
      return {
        pendingData,
      }
    })
  }

  private startEditing = () => {
    this.setState({ isEditing: true })
  }

  private cancelEditing = () => {
    this.setState({ isEditing: false, pendingData: this.mapDataToState() })
  }

  private saveProduct = () => {
    const productsValid = this.state.pendingData.every(product =>
      Object.keys(product).every(key => product[key].isValid)
    )

    if (productsValid) {
      this.setState({ isEditing: false })
      this.props.onUpdateData(this.state.pendingData)
    } else {
      alert('Please add valid values in fields marked with red')
    }
  }

  private removeRow = (index: number) => {
    this.setState(state => ({ pendingData: state.pendingData.filter(d => d !== state.pendingData[index]) }))
  }

  private renderProductCell = (product: ValidatedProduct<P>, property: keyof P, index: number) => {
    const currentProperty = product[property]
    return (
      <td key={property.toString()} className={currentProperty.isValid ? 'valid' : 'invalid'}>
        <input
          value={currentProperty.value}
          readOnly={!this.state.isEditing}
          onChange={e => this.editProduct(property, index, e.target.value)}
        />
        {currentProperty.validationError && <div className="error">{currentProperty.validationError}</div>}
      </td>
    )
  }

  public render() {
    const { isEditable } = this.props
    const { isEditing, pendingData } = this.state

    return (
      <div className="EditableTable">
        <table>
          <thead>
            <tr>
              {this.props.headers.concat(isEditing ? 'Remove row' : []).map(key => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pendingData.map((product, index) => (
              <tr key={index}>
                {Object.keys(product).map(key => this.renderProductCell(product, key as keyof P, index))}
                {isEditing && (
                  <td>
                    <button type="button" onClick={() => this.removeRow(index)}>
                      Remove row
                    </button>
                  </td>
                )}
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
                  Add line
                </button>
                <button type="button" onClick={this.saveProduct}>
                  Save changes
                </button>
              </>
            ) : (
              <button type="button" onClick={this.startEditing}>
                Edit data
              </button>
            )}
          </div>
        )}
        {isEditing && <h2>EDITING MODE - Click any cell to edit</h2>}
      </div>
    )
  }
}
