import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import { EMAIL_CHANGED,
        PASSWORD_CHANGED,
        LOGIN_SUCCESS,
        LOGIN_FAIL,
        LOGIN_USER,
        LOGOUT_USER } from './types';

export const emailChanged = (text) =>{
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) =>{
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};


export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch(() => loginUserFail(dispatch));
    };
};

export const logoutUser = () => {
    return {
        type: LOGOUT_USER,
        payload: null
    };
}

const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_FAIL });
}

const loginUserSuccess = (dispatch, user) => {
    dispatch({ type: LOGIN_SUCCESS,
                  payload: user});
};
