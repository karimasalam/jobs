import {FETCH_JOBS, FETCH_JOB, LOGIN, REGISTER, LOGIN_ERROR, APPLY_USERJOB, FETCH_USERJOB} from './types';
import axios from '../apis/JobsApi';

export const fetchJobs = () => async (dispatch) => {
    const response = await axios.get('/api/jobs', { crossdomain: true });
    dispatch( {type:FETCH_JOBS, payload: response.data } );
}
export const fetchJob = id => async dispatch => {
    const response = await axios.get(`/api/jobs/${id}`, { crossdomain: true });
    dispatch( {type:FETCH_JOB, payload: response.data } );
        
}

export const applyToJob = (id) => async (dispatch, getState) => {

    const userid = parseInt(localStorage.getItem("userid"));
    const token = localStorage.getItem("token");
    const response = await (await axios.post('/api/userjobs/',{userid: userid, jobid: parseInt(id) }, { crossdomain: true, headers: {
        Authorization: `Bearer ${token}`
    } }));
    dispatch( {type:APPLY_USERJOB, payload: response.data } );
        
}

export const getUserJobs = (id) => async (dispatch, getState) => {
    const userid = parseInt(localStorage.getItem("userid"));
    const token = localStorage.getItem("token");
    const response = await (await axios.get(`api/userjobs/${userid}`, { crossdomain: true, headers: {
        Authorization: `Bearer ${token}`
    } }));
   
    
    dispatch( {type:FETCH_USERJOB, payload: response.data[0] } );
        
}

export const login = formValues => async dispatch => {
    try {
      const response = await axios.post("/api/auth/login", formValues);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.user.username);
      localStorage.setItem("userid", response.data.user.id);
      dispatch({ type: LOGIN, payload: response.data });     

    } catch (error) {
        localStorage.removeItem("token");  
        localStorage.removeItem("user");
        localStorage.removeItem("userid");
        dispatch({ type: LOGIN_ERROR , payload: 'Wrong userName or password' });           
    }
}


export const register = formValues => async dispatch => {    
    try {
      const response = await axios.post("/api/auth/register", formValues);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.user.username);
      localStorage.setItem("userid", response.data.user.id);
      dispatch({ type: REGISTER, payload: response.data });
    } catch (error) {
        localStorage.removeItem("token");  
        localStorage.removeItem("user");
        localStorage.removeItem("userid");
        dispatch({ type: LOGIN_ERROR , payload: error.response.data[0].description });         
    }
}