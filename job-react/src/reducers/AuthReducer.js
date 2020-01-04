import {LOGIN, REGISTER, LOGIN_ERROR} from '../actions/types';
import Register from '../components/Auth/Register';
const INITIAL_STATE = {token: null, isLoggedIn: false, error: ''}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOGIN:
            return {...state, token: action.payload.token, isLoggedIn:true, error: ''};
        case REGISTER:
            return {...state, token: action.payload.token, isLoggedIn:true, error: ''};;
        case LOGIN_ERROR:
                return {token: null, isLoggedIn:false, error: action.payload};;
        default: 
            if(localStorage.getItem('token') === null)
                return {token: null, isLoggedIn: false, error: ''};
            else return {token: localStorage.getItem('token'), isLoggedIn: true, error: ''};
        

    }
}