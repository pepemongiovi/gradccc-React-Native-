import { LOAD_GRADE_NOVA,
    LOAD_GRADE_NOVA_FAIL,
    LOAD_GRADE_NOVA_SUCCESS,
    MAPEAR_GRADE_NOVA
} from '../actions/types';

import axios from 'axios';

const INITIAL_STATE = {
    loading: false,
    loaded: false,
    cadeirasGradeNova: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case LOAD_GRADE_NOVA:
            return {
                ...state,
                loading: true,
                loaded: false
            };
        case LOAD_GRADE_NOVA_SUCCESS:
            return {
                ...state,
                loaded: true,
                loading: false,
                cadeirasGradeNova: action.payload
            };
        case LOAD_GRADE_NOVA_FAIL:
            return {
                ...state,
                loaded: false,
                loading: false,
                cadeirasGradeNova: null
            };
        default:
            return state;
    }
};