import firebase from 'firebase';
import { NAME_CHANGED,
        NEW_EMAIL_CHANGED,
        NEW_PASSWORD_CHANGED,
        REGISTER_USER,
        REGISTER_SUCCESS,
        REGISTER_FAIL } from './types';

export const nameChanged = (text) =>{
    return {
        type: NAME_CHANGED,
        payload: text
    };
};

export const newEmailChanged = (text) =>{
    return {
        type: NEW_EMAIL_CHANGED,
        payload: text
    };
};

export const newPasswordChanged = (text) =>{
    return {
        type: NEW_PASSWORD_CHANGED,
        payload: text
    };
};

export const registerUser = ({ name, email, password }) => {
    return (dispatch) => {
        dispatch({ type: REGISTER_USER });

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => registerUserSuccess(dispatch, user, name))
            .catch(() => registerUserFail(dispatch));
    }
}

const registerUserFail = (dispatch) => {
    dispatch({ type: REGISTER_FAIL });
}

const registerUserSuccess = (dispatch, user, name) => {
    user.updateProfile({ displayName: name });
    dispatch({
       type: REGISTER_SUCCESS,
       payload: user
    });
};
