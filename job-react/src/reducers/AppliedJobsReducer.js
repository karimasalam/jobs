import {FETCH_USERJOB, APPLY_USERJOB} from '../actions/types';
import _ from 'lodash';

export default (state = [], action) => {
    switch(action.type) {
        case APPLY_USERJOB:
            return [...state, action.payload.jobId];
        case FETCH_USERJOB:
            return action.payload.userjobs.map(el => {return el.jobId});
        default: return state;

    }
}