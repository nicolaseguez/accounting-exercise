import {combineReducers} from 'redux';
import { deposits, errors } from './Dashboard';

export const rootReducer = combineReducers({
  deposits, errors
});
