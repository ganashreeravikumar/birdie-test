import { connect } from 'react-redux'

import DataVisualization from '../components/DataVisualization';
import { fetchData, updateSelectedCol } from '../actions/DataVisulizationAction';

const mapStateToProps = state => {
  return {
    data: state.data,
    isFetching: state.isFetching,
    selectedCol: state.selectedCol,
    errorMsg: state.errorMsg,
    remainingRecords: state.remainingRecords
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onButtonClick: col => {
      dispatch(fetchData(col));
    },
    onSelection: col => {
      dispatch(updateSelectedCol(col));
    }
  }
};

const DataContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DataVisualization);

export default DataContainer;
