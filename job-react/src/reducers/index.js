import { combineReducers } from 'redux';
import JobsReducer from './JobsReducer'

export default combineReducers({
    jobs: JobsReducer
});