import { reduxBatch } from '@manaflair/redux-batch';
import { createStore } from 'redux';
import reducer from '../src/components/redux/reducers';

export default () => createStore(reducer, reduxBatch);
