import {FETCH_JOBS, FETCH_JOB} from './types';
import axios from '../apis/JobsApi';

export const fetchJobs = () => async (dispatch) => {
    const response = await axios.get('/api/jobs');
    dispatch( {type:FETCH_JOBS, payload: response.data } );
}
export const fetchJob = id => async dispatch => {
    const response = await axios.get(`/api/jobs/${id}`);
    dispatch( {type:FETCH_JOB, payload: response.data } );
}