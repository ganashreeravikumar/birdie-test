import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import { Dropdown, Button, Dimmer, Loader } from 'semantic-ui-react'

import Options from '../Columns';
import DataTable from './DataTable';
import 'react-toastify/dist/ReactToastify.css';

class DataVisualization extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    selectedCol: PropTypes.string.isRequired,
    errorMsg: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    onButtonClick: PropTypes.func.isRequired,
    onSelection: PropTypes.func.isRequired,
  };


  handleChange = (e, { value }) => this.props.onSelection(value);

  getView = () => {
    const { data, isFetching, selectedCol, errorMsg } = this.props;

    if (isFetching) {
      return (
        <Dimmer active={isFetching}>
          <Loader active={isFetching} />
        </Dimmer>
      );

    } else if (errorMsg && errorMsg !== '') {

      toast.error(errorMsg, {
        position: toast.POSITION.BOTTOM_RIGHT
      });

      return <div />;

    } else if (data.length > 0) {
      return (
        <DataTable
          data={data}
          selectedCol={selectedCol}
        />
      );
    }
  };

  render() {
    const { selectedCol, onButtonClick, remainingRecords, data } = this.props;

    return (
      <div className="data-view">
        <h1>Data Visualization of Census Table</h1>
        <div className="dropdown-view">
          <p className="selection-text">Select the column name from the dropdown</p>
          <Dropdown
            placeholder={'Select a column'}
            fluid
            search
            selection
            className="selection-dropDown"
            options={Options}
            onChange={this.handleChange}
          />
          <Button
            className="show-btn"
            primary
            disabled={selectedCol === ''}
            onClick={() => onButtonClick(selectedCol)}
          >
            Show data
          </Button>
        </div>

        <div>
          <h5>TotalRecords: {remainingRecords + data.length}</h5>
          <h5>Remaining Records: {remainingRecords}</h5>
          {this.getView()}
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default DataVisualization;
