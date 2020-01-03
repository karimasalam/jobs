import {FETCH_JOBS, FETCH_JOB} from '../actions/types';
import _ from 'lodash';

export default (state = {}, action) => {
    switch(action.type) {
        case FETCH_JOB:
            return {...state, [action.payload.id]: action.payload};
        case FETCH_JOBS:
            return {...state, ..._.mapKeys(action.payload, 'id')};
        default: return state;

    }
}