import { LOAD_GRADE_ANTIGA,
        LOAD_GRADE_ANTIGA_FAIL,
        LOAD_GRADE_ANTIGA_SUCCESS,
        TOGGLE_CADEIRA,
        SELECIONA_PERIODO, 
        REALIZA_CONVERSAO,
        REALIZA_CONVERSAO_SUCCESS,
        REALIZA_CONVERSAO_FAIL,
        SELECIONA_TODAS_DISCIPLINAS,
        LOAD_SELECIONADAS_SUCCESS
    } from '../actions/types';

const INITIAL_STATE = {
    loading: false,
    loaded: false,
    cadeiras: null,
    idCadeirasSelecionadas: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case LOAD_GRADE_ANTIGA:
        case REALIZA_CONVERSAO:
            return {
                ...state,
                loading: true,
                loaded: false
            };
        case LOAD_GRADE_ANTIGA_SUCCESS:
            return {
                ...state,
                cadeiras: action.payload
            };
        case LOAD_SELECIONADAS_SUCCESS:
            return {
                ...state,
                loaded: true,
                loading: false,
                idCadeirasSelecionadas: action.payload
            };
        case LOAD_GRADE_ANTIGA_FAIL:
            return {
                ...state,
                loaded: false,
                loading: false,
                cadeiras: null
            };
        case TOGGLE_CADEIRA:
            const { periodo, idCadeira } = action.payload;
            novasCadeiras = {...state.cadeiras};
            novasCadeirasSelecionadas = [...state.idCadeirasSelecionadas];
            novasCadeiras[periodo].forEach((cadeira)=>{
                if (cadeira['id_disc'] == idCadeira){
                    cadeira.selecionada = !cadeira.selecionada;

                    if(novasCadeirasSelecionadas.includes(cadeira['id_disc'])){
                        const indexCadeira = novasCadeirasSelecionadas.indexOf(cadeira['id_disc']);
                        novasCadeirasSelecionadas.splice(indexCadeira, 1);
                    } else {
                        novasCadeirasSelecionadas.push(cadeira['id_disc']);
                    } 
                }
            });
            return {
                ...state,
                cadeiras: novasCadeiras,
                idCadeirasSelecionadas: novasCadeirasSelecionadas
            };
        case SELECIONA_TODAS_DISCIPLINAS:
            novasCadeiras = {...state.cadeiras};
            novasCadeirasSelecionadas = [...state.idCadeirasSelecionadas];

            Object.keys(novasCadeiras).forEach((periodo) => {
                const cadeirasPorPeriodo = novasCadeiras[periodo];
                cadeirasPorPeriodo.forEach(cadeira => {
                    cadeira.selecionada = true;
                    if(!novasCadeirasSelecionadas.includes(cadeira['id_disc']))
                        novasCadeirasSelecionadas.push(cadeira['id_disc']);
                }); 
            });
            return {
                ...state,
                cadeiras: novasCadeiras,
                idCadeirasSelecionadas: novasCadeirasSelecionadas
            };
        case SELECIONA_PERIODO:
            novasCadeiras = {...state.cadeiras};
            novasCadeirasSelecionadas = [...state.idCadeirasSelecionadas];
            const numeroPeriodo = action.payload.periodo;
            let cadeirasDoPeriodo = novasCadeiras[numeroPeriodo];
            
            cadeirasDoPeriodo.forEach(cadeira => {
                cadeira.selecionada = true;
                if(!novasCadeirasSelecionadas.includes(cadeira['id_disc']))
                    novasCadeirasSelecionadas.push(cadeira['id_disc']);
            });
            return {
                ...state,
                cadeiras: novasCadeiras,
                idCadeirasSelecionadas: novasCadeirasSelecionadas
            };
        default:
            return state;
    }
};