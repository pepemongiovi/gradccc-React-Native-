import { PERGUNTA_SELECIONADA } from '../actions/types';

const INITIAL_STATE = { 
    selecionado: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case PERGUNTA_SELECIONADA:
            return action.payload;
        default:
            return state;
    }
}