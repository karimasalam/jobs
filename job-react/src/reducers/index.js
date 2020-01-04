import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';
import JobsReducer from './JobsReducer'
import AuthReducer from './AuthReducer';

export default combineReducers({
    jobs: JobsReducer,
    form: formReducer,
    Auth: AuthReducer
});