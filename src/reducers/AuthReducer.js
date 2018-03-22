import { EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_USER,
    LOGOUT_USER } from '../actions/types';
import firebase from 'firebase';

const INITIAL_STATE = { email: '',
                    password: '',
                    error: '',
                    user: null,
                    loading: false};

export default (state = INITIAL_STATE, action) =>
{
    switch(action.type){
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case LOGIN_USER:
            return { ...state, loading: true, error: '' };
        case LOGIN_SUCCESS: 
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case LOGIN_FAIL:
            return { ...state, loading: false,
                    error: 'Falha na autenticação.', password: '' };
        case LOGOUT_USER:
            firebase.auth().signOut();
            return { ...state, user: action.payload };
        default:
            return state;
    }
}
