import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Table } from 'semantic-ui-react';

const { Header, HeaderCell, Row, Body, Cell} = Table;

class DataTable extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    selectedCol: PropTypes.string.isRequired,
  };

  render() {
    const { data, selectedCol } = this.props;
    
    return (
      <div>
        <Table compact='very' celled padded>
          <Header>
            <Row>
              <HeaderCell>{selectedCol}</HeaderCell>
              <HeaderCell>Count</HeaderCell>
              <HeaderCell>Average Age</HeaderCell>
            </Row>
          </Header>
          <Body>
            {data.map((row, index) => {
              return (
                <Row key={index}>
                  <Cell>{row.name}</Cell>
                  <Cell>{row.count}</Cell>
                  <Cell>{row.avg}</Cell>
                </Row>
              )
            })}
          </Body>
        </Table>
      </div>
    );
  }
}

export default DataTable;