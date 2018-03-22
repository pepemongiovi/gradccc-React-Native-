import {
    CALCULAR_CREDITOS_OBRIGATORIOS,
    CALCULAR_CREDITOS_OPTATIVOS_ESPECIFICOS,
    CALCULAR_CREDITOS_OPTATIVOS_GERAIS,
    CALCULAR_PERCENTAGEM_CURSO
} from '../actions/types';

export const calcularEstatisticas = (cadeiras) => {
    return(dispatch) => {
        dispatch({
            type: CALCULAR_CREDITOS_OBRIGATORIOS,
            payload: { cadeiras }
        });
        dispatch({
            type: CALCULAR_CREDITOS_OPTATIVOS_ESPECIFICOS,
            payload: { cadeiras }
        });
        dispatch({
            type: CALCULAR_CREDITOS_OPTATIVOS_GERAIS,
            payload: { cadeiras }
        });
        dispatch({
            type: CALCULAR_PERCENTAGEM_CURSO
        });
    }
};