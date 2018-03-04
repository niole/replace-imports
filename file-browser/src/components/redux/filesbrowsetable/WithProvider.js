import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import FilesBrowserTable from '../../FilesBrowserTable';

export default props =>
  <Provider store={store}>
    <FilesBrowserTable {...props} />
  </Provider>;
