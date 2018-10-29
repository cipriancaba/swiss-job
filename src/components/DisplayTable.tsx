import * as React from 'react'
import './DisplayTable.css'

export interface DisplayTableProps<P> {
  products: P[]
  headers: string[]
}

export class DisplayTable<P> extends React.PureComponent<DisplayTableProps<P>> {
  public render() {
    return (
      <div className="DisplayTable">
        <table>
          <thead>
            <tr>
              {this.props.headers.map(key => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((product, index) => (
              <tr key={index}>
                {Object.keys(product).map(key => (
                  <td key={key}>{product[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}
