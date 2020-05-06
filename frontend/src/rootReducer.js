import {combineReducers} from 'redux';
import { deposits, balance } from './Dashboard';

export const rootReducer = combineReducers({
  deposits,
  balance
});
