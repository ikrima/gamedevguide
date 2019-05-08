import React from 'react';
import { Route } from 'react-router-dom';

import DataTable from './routes/data-table/'
import Tables from './routes/tables/'


const Table = ({ match }) => (
  <div>
    <Route path={`${match.url}/data-table`} component={DataTable}/>
    <Route path={`${match.url}/tables`} component={Tables}/>
  </div>
)

export default Table;
