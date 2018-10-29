import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../configureStore'
import { Product, ProductMap } from '../types'
import { DisplayTable } from './DisplayTable'
import './TransformDataset.css'

type TransformDatasetProps = ReturnType<typeof mapStateToProps> & DispatchProp

interface TransformDatasetState {
  currentDictionary: ProductMap[]
  currentDictionaryId?: string
  mappedProducts: Product[]
}

class TransformDatasetComponent extends React.PureComponent<TransformDatasetProps, TransformDatasetState> {
  public state = {
    currentDictionary: [],
    currentDictionaryId: undefined,
    mappedProducts: [],
  }

  public componentDidMount = () => {
    const dictionaryKeys = Object.keys(this.props.dictionaries)
    if (dictionaryKeys.length > 0) {
      this.selectDictionaryByKey(dictionaryKeys[0])
    }
  }

  private onSelectDictionary = (event: React.FormEvent<HTMLSelectElement>) => {
    this.selectDictionaryByKey(event.currentTarget.value)
  }

  private selectDictionaryByKey = (key: string) => {
    const currentDictionary = this.props.dictionaries[key]
    const currentDictionaryMap = currentDictionary.reduce((acc, p) => ({ ...acc, [p.from]: p.to }), {})
    const mappedProducts = this.props.products.map(p => ({
      ...p,
      color: currentDictionaryMap[p.color] || 'Missing mapping key!!! Please add to transform dictionary',
    }))

    this.setState({
      currentDictionaryId: key,
      currentDictionary,
      mappedProducts,
    })
  }

  public render = () => (
    <div className="TransformDataset">
      <h1>TRANSFORM DATASET</h1>
      <div className="TransformSource">
        <div className="Dataset">
          <Link to="dataset">
            <h2>Original dataset</h2>
          </Link>
          <DisplayTable<Product> products={this.props.products} headers={['Product', 'Color', 'Price']} />
        </div>
        <div className="Dictionary">
          <Link to="manage">
            <h2>Transformation dictionary</h2>
          </Link>
          <div className="SelectContainer">
            <span>Please select mapping dictionary</span>
            <select onChange={this.onSelectDictionary} value={this.state.currentDictionaryId}>
              {Object.keys(this.props.dictionaries).map(key => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
          <DisplayTable<ProductMap> products={this.state.currentDictionary} headers={['From', 'To']} />
        </div>
      </div>
      <div className="TransformResult">
        <h2>Transform result</h2>
        <DisplayTable<Product> products={this.state.mappedProducts} headers={['Product', 'Color', 'Price']} />
      </div>
    </div>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    dictionaries: state.dictionaries,
    products: state.originalDataset,
  }
}

export const TransformDataset = connect(mapStateToProps)(TransformDatasetComponent)
