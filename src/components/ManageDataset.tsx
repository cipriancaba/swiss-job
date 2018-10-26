import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'src/configureStore'
import { DatasetTable } from './DatasetTable'

type ManageDatasetProps = ReturnType<typeof mapStateToProps>

class ManageDatasetComponent extends React.PureComponent<ManageDatasetProps> {
  public render = () => {
    return (
      <div>
        <h1>MANAGE DATASET</h1>
        <div>
          <DatasetTable dataset={this.props.dataset} isEditable={true} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  return { dataset: state.originalDataset }
}

export const ManageDataset = connect(mapStateToProps)(ManageDatasetComponent)
