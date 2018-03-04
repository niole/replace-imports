import { reduxBatch } from '@manaflair/redux-batch';
import { createStore } from 'redux';
import reducer from './reducers';

export default createStore(reducer, reduxBatch);
