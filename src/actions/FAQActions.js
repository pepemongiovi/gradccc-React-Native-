import { PERGUNTA_SELECIONADA } from './types';

export const selecionaPergunta = (id) =>{
    return {
        type: PERGUNTA_SELECIONADA,
        payload: id
    };
};