import {FETCH_JOBS, FETCH_JOB, LOGIN, REGISTER, LOGIN_ERROR} from './types';
import axios from '../apis/JobsApi';

export const fetchJobs = () => async (dispatch) => {
    const response = await axios.get('/api/jobs', { crossdomain: true });
    dispatch( {type:FETCH_JOBS, payload: response.data } );
}
export const fetchJob = id => async dispatch => {
    const response = await axios.get(`/api/jobs/${id}`, { crossdomain: true });
    dispatch( {type:FETCH_JOB, payload: response.data } );
        
}

export const login = formValues => async dispatch => {
    try {
      const response = await axios.post("/api/auth/login", formValues);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.user.username);
      dispatch({ type: LOGIN, payload: response.data });     

    } catch (error) {
        localStorage.removeItem("token");  
        localStorage.removeItem("user");
        dispatch({ type: LOGIN_ERROR , payload: 'Wrong userName or password' });           
    }
}


export const register = formValues => async dispatch => {    
    try {
      const response = await axios.post("/api/auth/register", formValues);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.user.username);
      dispatch({ type: REGISTER, payload: response.data });
    } catch (error) {
        localStorage.removeItem("token");  
        localStorage.removeItem("user");
        dispatch({ type: LOGIN_ERROR , payload: error.response.data[0].description });         
    }
}