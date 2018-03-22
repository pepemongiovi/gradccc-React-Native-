import { NAME_CHANGED,
    NEW_EMAIL_CHANGED,
    NEW_PASSWORD_CHANGED,
    REGISTER_USER,
    REGISTER_SUCCESS,
    REGISTER_FAIL } from '../actions/types';

const INITIAL_STATE = { name: '',
                        email: '',
                        password: '',
                        error: '',
                        user: null,
                        loading: false};

export default (state = INITIAL_STATE, action) =>
{
    switch(action.type){
        case NAME_CHANGED:
            return { ...state, name: action.payload };
        case NEW_EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case NEW_PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case REGISTER_USER:
            return { ...state, loading: true };
        case REGISTER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case REGISTER_FAIL:
            return { ...state, loading: false,
                    error: 'Campos inválidos.', password: '' };
        default:
            return state;
    }
}
